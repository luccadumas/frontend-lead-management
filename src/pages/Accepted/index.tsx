import React from 'react';
import { useLeads } from '@/contexts/LeadsContext';
import { LeadList } from '@/features/leads/LeadList';
import { PageContainer } from './styles';
import type { AcceptedPageProps } from './types';

export const Accepted: React.FC<AcceptedPageProps> = () => {
  const { leads } = useLeads();
  return (
    <PageContainer>
      <LeadList leads={leads} status="accepted" />
    </PageContainer>
  );
}; 