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
        console.log("[v0 AuthContext] Token encontrado, cargando usuario guardado...")
        const savedUser = await storage.getUser()
        if (savedUser) {
          setUser(savedUser)
          console.log("[v0 AuthContext] Usuario cargado desde storage")
        } else {
          console.log("[v0 AuthContext] No hay usuario guardado, limpiando token")
          await storage.clearAll()
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

      if (response.user) {
        console.log("[v0 AuthContext] Guardando datos del usuario del login")
        setUser(response.user)
        await storage.saveUser(response.user)
        console.log("[v0 AuthContext] Usuario guardado correctamente")
      } else {
        console.error("[v0 AuthContext] No se recibieron datos del usuario en el login")
        throw new Error("No se recibieron datos del usuario")
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
