"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { authApi } from "../api"
import { storage } from "../utils/storage"
import type { User } from "../types"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const boot = async () => {
      console.log("[v0 AuthContext] Iniciando aplicación...")
      const token = await storage.getToken()

      if (token) {
        console.log("[v0 AuthContext] Token encontrado, obteniendo usuario...")
        try {
          const userData = await authApi.getUser()
          setUser(userData)
          console.log("[v0 AuthContext] Usuario cargado")
        } catch (error) {
          console.error("[v0 AuthContext] Error cargando usuario, limpiando token")
          await storage.clearAll()
          setUser(null)
        }
      } else {
        console.log("[v0 AuthContext] No hay token guardado")
      }

      setLoading(false)
    }
    boot()
  }, [])

  const signIn = async (email: string, password: string): Promise<boolean> => {
    setLoading(true)
    try {
      console.log("[v0 AuthContext] Iniciando sesión para:", email)

      const response = await authApi.login({ email, password })

      if (!response || !response.token) {
        console.error("[v0 AuthContext] Respuesta inválida:", response)
        throw new Error("No se recibió token del servidor")
      }

      console.log("[v0 AuthContext] Token recibido, guardando...")
      await storage.saveToken(response.token)

      console.log("[v0 AuthContext] Obteniendo datos del usuario...")
      try {
        const userData = await authApi.getUser()
        setUser(userData)
        await storage.saveUser(userData)
        console.log("[v0 AuthContext] Usuario guardado correctamente")
      } catch (userError) {
        console.warn("[v0 AuthContext] No se pudo obtener usuario del endpoint /user, usando datos del login")
        if (response.user) {
          setUser(response.user)
          await storage.saveUser(response.user)
        }
      }

      console.log("[v0 AuthContext] Login completado exitosamente")
      setLoading(false)
      return true
    } catch (err: any) {
      console.error("[v0 AuthContext] Error en signIn:", {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      })
      setLoading(false)
      throw err
    }
  }

  const signOut = async () => {
    try {
      console.log("[v0 AuthContext] Cerrando sesión...")
      await authApi.logout()
    } catch (e) {
      console.error("[v0 AuthContext] Error en logout:", e)
    } finally {
      await storage.clearAll()
      setUser(null)
      console.log("[v0 AuthContext] Sesión cerrada")
    }
  }

  return <AuthContext.Provider value={{ user, loading, signIn, signOut }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de AuthProvider")
  }
  return context
}
