import React from 'react';
import { LeadCard } from '@/components/LeadCard';
import { ListContainer, EmptyMessage, LoadingContainer, LoadingCard } from './styles';
import { Pagination } from '@/components/Pagination';
import { LeadListProps } from './types';
import { useLeadList } from './hooks/useLeadList';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export const LeadList: React.FC<LeadListProps> = ({ status }) => {
  const {
    loading,
    paginatedLeads,
    totalPages,
    page,
    handleAccept,
    handleDecline,
    handlePrevPage,
    handleNextPage,
    filteredLeads
  } = useLeadList(status);

  const { error } = useErrorHandler();

  if (loading) {
    return (
      <LoadingContainer className="w-full space-y-4">
        {[1, 2, 3].map((key) => (
          <LoadingCard
            key={key}
            data-testid="loading-card"
            className="h-52 rounded-lg border border-slate-200 bg-white"
          />
        ))}
      </LoadingContainer>
    );
  }

  if (error) {
    return (
      <EmptyMessage
        data-testid="error-message"
        className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-red-700"
      >
        Ocorreu um erro ao carregar os dados. Tente novamente em instantes.<br />Erro: {error.message}
      </EmptyMessage>
    );
  }

  return (
    <ListContainer className="w-full space-y-4 pb-4">
      {filteredLeads.length === 0 ? (
        <EmptyMessage className="rounded-lg border border-slate-200 bg-white px-4 py-10 text-slate-600">
          {status === 'invited'
            ? 'Nenhum lead convidado no momento.'
            : status === 'accepted'
            ? 'Nenhum lead aceito no momento.'
            : 'Nenhum lead recusado no momento.'}
        </EmptyMessage>
      ) : (
        <>
          {paginatedLeads.map(lead => {
            const leadProps = {
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

            return <LeadCard key={lead.id} {...leadProps} />;
          })}
          <div className="rounded-lg bg-white px-4 py-3 shadow-sm ring-1 ring-slate-200">
            <Pagination
              page={page}
              totalPages={totalPages}
              onPrev={handlePrevPage}
              onNext={handleNextPage}
            />
          </div>
        </>
      )}
    </ListContainer>
  );
}; 
