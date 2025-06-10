import React, { useEffect } from 'react';
import type { Lead, LeadStatus } from '@/contexts/LeadsContext/types';
import { LeadCard } from '@/components/LeadCard';
import { ListContainer, EmptyMessage, LoadingContainer, LoadingCard } from './styles';
import { useLeads } from '@/contexts/LeadsContext';

interface LeadListProps {
  status: LeadStatus;
}

export const LeadList: React.FC<LeadListProps> = ({ status }) => {
  const { leads = [], loading, error, fetchLeads, acceptLead, declineLead } = useLeads();

  useEffect(() => {
    fetchLeads(status);
  }, [fetchLeads, status]);

  if (loading) {
    return (
      <LoadingContainer>
        {[1, 2, 3].map((key) => (
          <LoadingCard key={key} />
        ))}
      </LoadingContainer>
    );
  }

  if (error) {
    return <EmptyMessage>Error: {error}</EmptyMessage>;
  }

  const filteredLeads = leads.filter((lead: Lead) => lead.status === status);

  return (
    <ListContainer>
      {filteredLeads.length === 0 ? (
        <EmptyMessage>
          {status === 'invited'
            ? 'No invited leads at this time.'
            : status === 'accepted'
            ? 'No leads accepted at this time.'
            : 'No leads declined at this time.'}
        </EmptyMessage>
      ) : (
        filteredLeads.map(lead => (
          <LeadCard
            key={lead.id}
            name={status === 'accepted' ? `${lead.firstName}${lead.lastName ? ' ' + lead.lastName : ''}` : lead.firstName}
            date={lead.date}
            suburb={lead.suburb}
            category={lead.category}
            jobId={lead.jobId}
            description={lead.description}
            price={lead.price}
            accepted={status === 'accepted'}
            phone={status === 'accepted' ? lead.phone : undefined}
            email={status === 'accepted' ? lead.email : undefined}
            onAccept={acceptLead ? () => acceptLead(lead.id) : undefined}
            onDecline={declineLead ? () => declineLead(lead.id) : undefined}
          />
        ))
      )}
    </ListContainer>
  );
}; 
