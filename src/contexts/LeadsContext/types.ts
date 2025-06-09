export type LeadStatus = 'invited' | 'accepted' | 'declined';

export interface Lead {
  id: string;
  firstName: string;
  lastName?: string;
  date: string;
  suburb: string;
  category: string;
  description: string;
  price: number;
  status: LeadStatus;
  phone?: string;
  email?: string;
} 