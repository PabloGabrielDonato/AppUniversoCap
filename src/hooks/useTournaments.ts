import { useState, useEffect } from 'react';
import { tournamentsApi } from '../api';
import { Tournament } from '../types';

export const useTournaments = () => {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTournaments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tournamentsApi.getAll();
      setTournaments(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error al cargar torneos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return {
    tournaments,
    loading,
    error,
    refetch: fetchTournaments,
  };
};