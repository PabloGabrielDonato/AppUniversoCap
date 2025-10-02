import AsyncStorage from "@react-native-async-storage/async-storage"
import type { User } from "../types"

const KEYS = {
  TOKEN: "@auth_token",
  USER: "@user_data",
}

export const storage = {
  // Token methods
  saveToken: async (token: string): Promise<void> => {
    try {
      await AsyncStorage.setItem(KEYS.TOKEN, token)
      console.log("[v0 Storage] Token guardado")
    } catch (error) {
      console.error("[v0 Storage] Error guardando token:", error)
      throw error
    }
  },

  getToken: async (): Promise<string | null> => {
    try {
      const token = await AsyncStorage.getItem(KEYS.TOKEN)
      return token
    } catch (error) {
      console.error("[v0 Storage] Error obteniendo token:", error)
      return null
    }
  },

  // User methods
  saveUser: async (user: User): Promise<void> => {
    try {
      await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user))
      console.log("[v0 Storage] Usuario guardado")
    } catch (error) {
      console.error("[v0 Storage] Error guardando usuario:", error)
      throw error
    }
  },

  getUser: async (): Promise<User | null> => {
    try {
      const userData = await AsyncStorage.getItem(KEYS.USER)
      return userData ? JSON.parse(userData) : null
    } catch (error) {
      console.error("[v0 Storage] Error obteniendo usuario:", error)
      return null
    }
  },

  // Clear all
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([KEYS.TOKEN, KEYS.USER])
      console.log("[v0 Storage] Storage limpiado")
    } catch (error) {
      console.error("[v0 Storage] Error limpiando storage:", error)
      throw error
    }
  },
}
