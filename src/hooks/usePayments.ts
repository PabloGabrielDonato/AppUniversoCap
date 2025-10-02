import { useState } from 'react';
import { paymentsApi } from '../api';
import { PaymentStatus } from '../types';

export const usePayments = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPaymentStatus = async (dni: string): Promise<PaymentStatus | null> => {
    try {
      setLoading(true);
      setError(null);
      const data = await paymentsApi.getStatusByDni(dni);
      return data;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al obtener estado de pago');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    getPaymentStatus,
    loading,
    error,
  };
};