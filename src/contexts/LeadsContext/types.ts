export type LeadStatus = 'invited' | 'accepted' | 'declined';

export interface State {
  leads: Lead[];
}

export interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  fetchLeads: (status?: LeadStatus) => Promise<void>;
  acceptLead: (id: string) => Promise<void>;
  declineLead: (id: string) => Promise<void>;
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
