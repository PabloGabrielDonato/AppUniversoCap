import apiClient from "./client"
import { ENDPOINTS } from "../constants/config"
import type { LoginRequest, LoginResponse, User } from "../types"

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log("[v0 Auth] Intentando login con:", credentials.email)
      const response = await apiClient.post<any>(ENDPOINTS.AUTH.LOGIN, credentials)

      console.log("[v0 Auth] Respuesta completa del servidor:", JSON.stringify(response.data, null, 2))

      let token = null

      // Formato 1: { auth_token: "..." } - Formato del backend actualizado
      if (response.data.auth_token) {
        token = response.data.auth_token
        console.log("[v0 Auth] Token encontrado en response.data.auth_token")
      }
      // Formato 2: { token: "..." }
      else if (response.data.token) {
        token = response.data.token
        console.log("[v0 Auth] Token encontrado en response.data.token")
      }
      // Formato 3: { access_token: "..." }
      else if (response.data.access_token) {
        token = response.data.access_token
        console.log("[v0 Auth] Token encontrado en response.data.access_token")
      }
      // Formato 4: { data: { token: "..." } }
      else if (response.data.data?.token) {
        token = response.data.data.token
        console.log("[v0 Auth] Token encontrado en response.data.data.token")
      }

      if (!token) {
        console.error("[v0 Auth] No se encontró token en ningún formato conocido")
        console.error("[v0 Auth] Estructura de respuesta:", response.data)
        throw new Error("No se recibió token del servidor. Revisa los logs para ver la estructura de la respuesta.")
      }

      console.log("[v0 Auth] Login exitoso, token extraído correctamente")

      return {
        token,
        user: response.data.user || response.data.data?.user,
      }
    } catch (error: any) {
      console.error("[v0 Auth] Error en login:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      })
      throw error
    }
  },

  logout: async (): Promise<void> => {
    try {
      console.log("[v0 Auth] Cerrando sesión...")
      await apiClient.post(ENDPOINTS.AUTH.LOGOUT)
      console.log("[v0 Auth] Sesión cerrada exitosamente")
    } catch (error: any) {
      console.error("[v0 Auth] Error en logout:", error.message)
      throw error
    }
  },

  getUser: async (): Promise<User> => {
    try {
      console.log("[v0 Auth] Obteniendo usuario autenticado...")
      const response = await apiClient.get<any>(ENDPOINTS.USER)

      const userData = response.data.data || response.data
      console.log("[v0 Auth] Usuario obtenido:", userData)

      return userData
    } catch (error: any) {
      console.error("[v0 Auth] Error obteniendo usuario:", error.message)
      throw error
    }
  },
}
