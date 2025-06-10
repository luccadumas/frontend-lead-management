import React from 'react';
import { LeadCard } from '@/components/LeadCard';
import { ListContainer, EmptyMessage, LoadingContainer, LoadingCard } from './styles';
import { Pagination } from '@/components/Pagination';
import { LeadListProps } from './types';
import { useLeadList } from './hooks/useLeadList';

export const LeadList: React.FC<LeadListProps> = ({ status }) => {
  const {
    loading,
    error,
    paginatedLeads,
    totalPages,
    page,
    handleAccept,
    handleDecline,
    handlePrevPage,
    handleNextPage,
    filteredLeads
  } = useLeadList(status);

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
    return <EmptyMessage>Sorry, something went wrong. Please try again later.<br />Error: {error.message}</EmptyMessage>;
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
              name: `${lead.firstName}${lead.lastName ? ' ' + lead.lastName : ''}`,
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
            onPrev={handlePrevPage}
            onNext={handleNextPage}
          />
        </>
      )}
    </ListContainer>
  );
}; 
