import apiClient from "./client"
import { ENDPOINTS } from "../constants/config"
import type { User, UserData } from "../types"

export const userApi = {
  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<{ data: User }>(ENDPOINTS.USER_DATA.PROFILE)
    return response.data.data || response.data
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<{ data: User }>(ENDPOINTS.USER)
    return response.data.data || response.data
  },

  getUserData: async (): Promise<UserData> => {
    const response = await apiClient.get<{ data: UserData }>(ENDPOINTS.USER_DATA.GET)
    return response.data.data || response.data
  },

  updateUser: async (data: Partial<User>): Promise<User> => {
    const response = await apiClient.put<{ data: User }>(ENDPOINTS.USER, data)
    return response.data.data || response.data
  },

  updateUserData: async (data: Partial<UserData>): Promise<UserData> => {
    const response = await apiClient.put<{ data: UserData }>(ENDPOINTS.USER_DATA.UPDATE, data)
    return response.data.data || response.data
  },

  getFederations: async (): Promise<any[]> => {
    const response = await apiClient.get<{ data: any[] }>(ENDPOINTS.USER_DATA.FEDERATIONS)
    return response.data.data || response.data
  },

  getTournaments: async (): Promise<any[]> => {
    const response = await apiClient.get<{ data: any[] }>(ENDPOINTS.USER_DATA.TOURNAMENTS)
    return response.data.data || response.data
  },

  getPayments: async (): Promise<any[]> => {
    const response = await apiClient.get<{ data: any[] }>(ENDPOINTS.USER_DATA.PAYMENTS)
    return response.data.data || response.data
  },
}
