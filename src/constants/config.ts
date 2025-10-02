import { Platform } from "react-native"

// Cambia esto a true para usar el servidor local, false para producción
const USE_LOCAL_DEV = false

// Para Android Emulator usa 10.0.2.2, para iOS/físico usa tu IP local
// IMPORTANTE: Reemplaza "192.168.1.X" con la IP real de tu computadora
const getLocalDevUrl = () => {
  if (Platform.OS === "android") {
    // Android Emulator: 10.0.2.2 apunta al localhost del host
    return "http://172.20.128.1:90"
  }
  // iOS Simulator puede usar localhost
  // Para dispositivo físico, usa la IP de tu computadora en la red local
  // Ejemplo: return 'http://192.168.1.100:90';
  return "http://localhost:90"
}

const DEV_BASE_URL = getLocalDevUrl()
const PROD_BASE_URL = "https://miscausas.com.ar"

export const API_CONFIG = {
  BASE_URL: USE_LOCAL_DEV ? DEV_BASE_URL : PROD_BASE_URL,
  TIMEOUT: 30000,
}

export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
  },
  USER: "/api/user",

  PAYMENTS: {
    WEBHOOKS_MERCADOPAGO: "/api/payments/webhooks/mercadopago",
    STATUS_BY_DNI: (dni: string) => `/api/payments/status/${dni}`,
  },

  STATUS: {
    MEMBER_BY_DNI: (dni: string) => `/api/status/member/${dni}`,
    MEMBERS_ARRAY: "/api/status/member",
  },

  TOURNAMENTS: {
    ALL: "/api/tournaments",
    PARTICIPANT: (tournamentId: number, dni: string) => `/api/tournaments/${tournamentId}/participants/${dni}`,
    PARTICIPANTS_INFO: "/api/tournaments/participants/info",
  },
}

// Log para verificar qué URL se está usando
console.log("[v0 Config] Usando URL:", API_CONFIG.BASE_URL)