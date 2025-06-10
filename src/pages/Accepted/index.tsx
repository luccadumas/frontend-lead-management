import React from 'react';
import { LeadList } from '@/features/leads/LeadList';
import { PageContainer } from './styles';
import type { AcceptedPageProps } from './types';

export const Accepted: React.FC<AcceptedPageProps> = () => {
  return (
    <PageContainer>
      <LeadList status="accepted" />
    </PageContainer>
  );
}; 
