import React from 'react';
import type { LeadListProps } from './types';
import { LeadCard } from '@/components/LeadCard';
import { ListContainer, EmptyMessage } from './styles';

export const LeadList: React.FC<LeadListProps> = ({ leads, status, onAccept, onDecline }) => {
  const filteredLeads = leads.filter(lead => lead.status === status);
  return (
    <ListContainer>
      {filteredLeads.length === 0 ? (
        <EmptyMessage>
          {status === 'invited'
            ? 'No invited leads at this time.'
            : 'No leads accepted at this time.'}
        </EmptyMessage>
      ) : (
        filteredLeads.map(lead => (
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
            phone={status === 'accepted' && lead.phone}
            email={status === 'accepted' && lead.email}
            onAccept={onAccept && (() => onAccept(lead.id))}
            onDecline={onDecline && (() => onDecline(lead.id))}
          />
        ))
      )}
    </ListContainer>
  );
}; 