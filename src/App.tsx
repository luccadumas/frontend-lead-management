import React, { useState } from 'react';
import { LeadsProvider } from './contexts/LeadsContext';
import { Tabs } from './components/Tabs';
import type { LeadStatus } from './contexts/LeadsContext/types';
import { LeadList } from './features/leads/LeadList';
import { GlobalStyle } from './styles/GlobalStyle';
import { MainContainer } from './pages/Accepted/styles';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeadStatus>('invited');

  return (
    <LeadsProvider>
      <GlobalStyle />
      <MainContainer>
        <Tabs active={activeTab} onChange={setActiveTab} />
        <LeadList status={activeTab} />
      </MainContainer>
    </LeadsProvider>
  );
};

export default App;
