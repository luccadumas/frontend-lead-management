import type { Lead, LeadStatus } from '@/contexts/LeadsContext/types';
import type { CreateLeadDTO, UpdateLeadDTO, LeadsApi } from './types';
import { api } from '../client';

export const leadsApi: LeadsApi = {
  create: (data: CreateLeadDTO) => api.post<Lead>('/leads', data).then(response => response.data),
  list: () => api.get<Lead[]>('/leads').then(response => response.data),
  getByStatus: (status: LeadStatus) => api.get<Lead[]>(`/leads/status/${status}`).then(response => response.data),
  getById: (id: string) => api.get<Lead>(`/leads/${id}`).then(response => response.data),
  accept: (id: string) => api.post<Lead>(`/leads/${id}/accept`).then(response => response.data),
  decline: (id: string) => api.post<Lead>(`/leads/${id}/decline`).then(response => response.data),
  update: (id: string, data: UpdateLeadDTO) => api.put<Lead>(`/leads/${id}`, data).then(response => response.data),
  delete: (id: string) => api.delete(`/leads/${id}`).then(() => undefined),
}; 
