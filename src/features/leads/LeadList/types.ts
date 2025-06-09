import type { Lead, LeadStatus } from '@/contexts/LeadsContext/types';

export interface LeadListProps {
  leads: Lead[];
  status: LeadStatus;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
} 