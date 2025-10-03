const USE_LOCAL_DEV = true

// INSTRUCCIONES:
// 1. Ejecuta: ngrok http 90
// 2. Copia la URL que te da (ej: https://abc123.ngrok-free.app)
// 3. Pégala en NGROK_URL abajo
const NGROK_URL = "https://dc38e1a5fe0f.ngrok-free.app/" // Reemplaza esto con tu URL de ngrok

const DEV_BASE_URL = NGROK_URL
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

  // Endpoints actualizados para coincidir con el backend
  USER_DATA: {
    PROFILE: "/api/user/profile",
    GET: "/api/user/data",
    UPDATE: "/api/user/data",
    FEDERATIONS: "/api/user/federations",
    TOURNAMENTS: "/api/user/tournaments",
    PAYMENTS: "/api/user/payments",
  },

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
// console.log("[v0 Config] Usando URL:", API_CONFIG.BASE_URL)
