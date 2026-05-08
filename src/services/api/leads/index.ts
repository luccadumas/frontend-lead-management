import type { Lead, LeadStatus } from '@/contexts/LeadsContext/types';
import type { CreateLeadDTO, UpdateLeadDTO, LeadsApi } from './types';
import { apiRequest } from '../api';

const leadHost = (import.meta.env.VITE_API_URL || 'http://localhost:3000').replace(/\/+$/, '');
const baseUrl = `${leadHost}/api/leads`;

export const leadsApi: LeadsApi = {
  create: (data: CreateLeadDTO) => apiRequest<Lead>(baseUrl, { method: 'POST', body: data }),
  list: () => apiRequest<Lead[]>(baseUrl),
  getByStatus: (status: LeadStatus) => apiRequest<Lead[]>(`${baseUrl}/status/${status}`),
  getById: (id: string) => apiRequest<Lead>(`${baseUrl}/${id}`),
  accept: (id: string) => apiRequest<Lead>(`${baseUrl}/${id}/accept`, { method: 'POST' }),
  decline: (id: string) => apiRequest<Lead>(`${baseUrl}/${id}/decline`, { method: 'POST' }),
  update: (id: string, data: UpdateLeadDTO) => apiRequest<Lead>(`${baseUrl}/${id}`, { method: 'PUT', body: data }),
  delete: async (id: string) => {
    await apiRequest<unknown>(`${baseUrl}/${id}`, { method: 'DELETE' });
  },
}; 
