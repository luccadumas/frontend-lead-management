import React, { useState } from 'react';
import { LeadProvider } from './contexts/LeadsContext';
import { Tabs } from './components/Tabs';
import { Invited } from './pages/Invited';
import { Accepted } from './pages/Accepted';
import { GlobalStyle } from './styles/GlobalStyle';
import { MainContainer } from './pages/Accepted/styles';

const App: React.FC = () => {
  const [tab, setTab] = useState<'invited' | 'accepted'>('invited');
  return (
    <LeadProvider>
      <GlobalStyle />
      <MainContainer>
        <Tabs active={tab} onChange={setTab} />
        {tab === 'invited' ? <Invited /> : <Accepted />}
      </MainContainer>
    </LeadProvider>
  );
};

export default App;
