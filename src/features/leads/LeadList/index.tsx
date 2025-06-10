import React, { useEffect, useMemo, useState, useCallback } from 'react';
import type { Lead, LeadStatus } from '@/contexts/LeadsContext/types';
import { LeadCard } from '@/components/LeadCard';
import { ListContainer, EmptyMessage, LoadingContainer, LoadingCard } from './styles';
import { useLeads } from '@/contexts/LeadsContext';
import { Pagination } from '@/components/Pagination';

interface LeadListProps {
  status: LeadStatus;
}

export const LeadList: React.FC<LeadListProps> = ({ status }) => {
  const { leads = [], loading, error, fetchLeads, acceptLead, declineLead } = useLeads();
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    fetchLeads(status);
  }, [fetchLeads, status]);

  const filteredLeads = useMemo(() => leads.filter((lead: Lead) => lead.status === status), [leads, status]);
  const paginatedLeads = useMemo(() => filteredLeads.slice((page - 1) * pageSize, page * pageSize), [filteredLeads, page]);
  const totalPages = Math.ceil(filteredLeads.length / pageSize);

  const handleAccept = useCallback((id: string) => {
    if (acceptLead) acceptLead(id);
  }, [acceptLead]);

  const handleDecline = useCallback((id: string) => {
    if (declineLead) declineLead(id);
  }, [declineLead]);

  if (loading) {
    return (
      <LoadingContainer>
        {[1, 2, 3].map((key) => (
          <LoadingCard key={key} data-testid="loading-card" />
        ))}
      </LoadingContainer>
    );
  }

  if (error) {
    return <EmptyMessage>Sorry, something went wrong. Please try again later.<br />Error: {error}</EmptyMessage>;
  }

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
        <>
          {paginatedLeads.map(lead => {
            const leadCardProps = {
              key: lead.id,
              name: status === 'accepted'
                ? `${lead.firstName}${lead.lastName ? ' ' + lead.lastName : ''}`
                : lead.firstName,
              date: lead.date,
              suburb: lead.suburb,
              category: lead.category,
              jobId: lead.jobId,
              description: lead.description,
              price: lead.price,
              accepted: status === 'accepted',
              onAccept: () => handleAccept(lead.id),
              onDecline: () => handleDecline(lead.id),
              ...(status === 'accepted' && {
                phone: lead.phone,
                email: lead.email,
              }),
            };

            return <LeadCard {...leadCardProps} />;
          })}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrev={() => setPage(p => Math.max(1, p - 1))}
            onNext={() => setPage(p => Math.min(totalPages, p + 1))}
          />
        </>
      )}
    </ListContainer>
  );
}; 
