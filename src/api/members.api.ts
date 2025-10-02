import apiClient from './client';
import { ENDPOINTS } from '../constants/config';
import { MemberStatus } from '../types';

export const membersApi = {
  getStatusByDni: async (dni: string): Promise<MemberStatus> => {
    const response = await apiClient.get<MemberStatus>(
      ENDPOINTS.STATUS.MEMBER_BY_DNI(dni)
    );
    return response.data;
  },

  getStatusArray: async (dnis: string[]): Promise<MemberStatus[]> => {
    const response = await apiClient.post<MemberStatus[]>(
      ENDPOINTS.STATUS.MEMBERS_ARRAY,
      { dnis }
    );
    return response.data;
  },
};