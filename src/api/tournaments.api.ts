import apiClient from './client';
import { ENDPOINTS } from '../constants/config';
import { Tournament, Participant } from '../types';

export const tournamentsApi = {
  getAll: async (): Promise<Tournament[]> => {
    const response = await apiClient.get<Tournament[]>(ENDPOINTS.TOURNAMENTS.ALL);
    return response.data;
  },

  getParticipant: async (tournamentId: number, dni: string): Promise<Participant> => {
    const response = await apiClient.get<Participant>(
      ENDPOINTS.TOURNAMENTS.PARTICIPANT(tournamentId, dni)
    );
    return response.data;
  },

  getByParticipantList: async (dnis: string[]): Promise<any> => {
    const response = await apiClient.post(
      ENDPOINTS.TOURNAMENTS.PARTICIPANTS_INFO,
      { dnis }
    );
    return response.data;
  },
};