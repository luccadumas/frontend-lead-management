import React from 'react';
import { LeadList } from '@/features/leads/LeadList';
import { PageContainer } from './styles';
import type { InvitedPageProps } from './types';

export const Invited: React.FC<InvitedPageProps> = () => {
  return (
    <PageContainer>
      <LeadList status="invited" />
    </PageContainer>
  );
}; 
