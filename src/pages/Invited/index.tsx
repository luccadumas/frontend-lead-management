import React from 'react';
import { useLeads } from '../../contexts/LeadsContext';
import { LeadList } from '../../features/leads/LeadList';
import { PageContainer } from './styles';
import type { InvitedPageProps } from './types';

export const Invited: React.FC<InvitedPageProps> = () => {
  const { leads, acceptLead, declineLead } = useLeads();
  return (
    <PageContainer>
      <LeadList leads={leads} status="invited" onAccept={acceptLead} onDecline={declineLead} />
    </PageContainer>
  );
}; 