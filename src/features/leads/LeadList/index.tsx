import React from 'react';
import type { Lead, LeadStatus } from '../../../contexts/LeadsContext/types';
import { LeadCard } from '../../../components/LeadCard';

export interface LeadListProps {
  leads: Lead[];
  status: LeadStatus;
  onAccept?: (id: string) => void;
  onDecline?: (id: string) => void;
}

export const LeadList: React.FC<LeadListProps> = ({ leads, status, onAccept, onDecline }) => {
  return (
    <div>
      {leads.filter(lead => lead.status === status).map(lead => (
        <LeadCard
          key={lead.id}
          name={status === 'accepted' ? `${lead.firstName}${lead.lastName ? ' ' + lead.lastName : ''}` : lead.firstName}
          date={lead.date}
          suburb={lead.suburb}
          category={lead.category}
          jobId={lead.id}
          description={lead.description}
          price={lead.price}
          accepted={status === 'accepted'}
          phone={status === 'accepted' ? lead.phone : undefined}
          email={status === 'accepted' ? lead.email : undefined}
          onAccept={onAccept ? () => onAccept(lead.id) : undefined}
          onDecline={onDecline ? () => onDecline(lead.id) : undefined}
        />
      ))}
    </div>
  );
}; 