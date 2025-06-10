import type { Lead, LeadStatus } from '@/contexts/LeadsContext/types';

export type CreateLeadDTO = Omit<Lead, 'id'>;
export type UpdateLeadDTO = Partial<Lead>;

export interface LeadsApi {
  create: (data: CreateLeadDTO) => Promise<Lead>;
  list: () => Promise<Lead[]>;
  getByStatus: (status: LeadStatus) => Promise<Lead[]>;
  getById: (id: string) => Promise<Lead>;
  accept: (id: string) => Promise<Lead>;
  decline: (id: string) => Promise<Lead>;
  update: (id: string, data: UpdateLeadDTO) => Promise<Lead>;
  delete: (id: string) => Promise<void>;
} 
