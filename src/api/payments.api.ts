import apiClient from './client';
import { ENDPOINTS } from '../constants/config';
import { PaymentStatus } from '../types';

export const paymentsApi = {
  getStatusByDni: async (dni: string): Promise<PaymentStatus> => {
    const response = await apiClient.get<PaymentStatus>(
      ENDPOINTS.PAYMENTS.STATUS_BY_DNI(dni)
    );
    return response.data;
  },
};