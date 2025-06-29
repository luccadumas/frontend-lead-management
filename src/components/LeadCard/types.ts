export interface LeadCardProps {
  name: string;
  date: string;
  suburb: string;
  category: string;
  jobId: number;
  description: string;
  price: number;
  onAccept?: () => void;
  onDecline?: () => void;
  accepted?: boolean;
  phone?: string;
  email?: string;
} 
