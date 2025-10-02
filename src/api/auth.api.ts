import apiClient from './client';
import { ENDPOINTS } from '../constants/config';
import { LoginRequest, LoginResponse, User } from '../types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      console.log('[v0 Auth] Intentando login con:', credentials.email);
      const response = await apiClient.post<any>(
        ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      console.log('[v0 Auth] Respuesta del servidor recibida');

      let token = null;

      // Formato específico de tu Laravel: { auth_token: "..." }
      if (response.data.auth_token) {
        token = response.data.auth_token;
        console.log('[v0 Auth] Token encontrado en response.data.auth_token');
      }
      // Formato 1: { token: "..." }
      else if (response.data.token) {
        token = response.data.token;
        console.log('[v0 Auth] Token encontrado en response.data.token');
      }
      // Formato 2: { access_token: "..." }
      else if (response.data.access_token) {
        token = response.data.access_token;
        console.log('[v0 Auth] Token encontrado en response.data.access_token');
      }
      // Formato 3: { data: { token: "..." } }
      else if (response.data.data?.token) {
        token = response.data.data.token;
        console.log('[v0 Auth] Token encontrado en response.data.data.token');
      }

      if (!token) {
        console.error('[v0 Auth] No se encontró token en la respuesta');
        throw new Error('No se recibió token del servidor');
      }

      console.log('[v0 Auth] Login exitoso');

      return {
        token,
        user: response.data.data || response.data.user,
      };
    } catch (error: any) {
      console.error('[v0 Auth] Error en login:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    // Intentar logout en el servidor, pero permitir que falle silenciosamente
    await apiClient.post(ENDPOINTS.AUTH.LOGOUT);
  },

  getUser: async (): Promise<User> => {
    try {
      console.log('[v0 Auth] Obteniendo usuario autenticado...');
      const response = await apiClient.get<any>(ENDPOINTS.USER);

      const userData = response.data.data || response.data;
      console.log('[v0 Auth] Usuario obtenido');

      return userData;
    } catch (error: any) {
      console.error('[v0 Auth] Error obteniendo usuario:', error.message);
      throw error;
    }
  },
};