export type LeadStatus = 'invited' | 'accepted' | 'declined';

export interface State {
  leads: Lead[];
}

export interface Lead {
  id: string;
  firstName: string;
  lastName?: string;
  date: string;
  suburb: string;
  category: string;
  jobId: number;
  description: string;
  price: number;
  status: LeadStatus;
  phone?: string;
  email?: string;
} 
