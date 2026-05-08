import React, { useEffect, useState } from 'react';
import { LeadsProvider } from './contexts/LeadsContext';
import { Tabs } from './components/Tabs';
import type { LeadStatus } from './contexts/LeadsContext/types';
import { LeadList } from './features/leads/LeadList';
import { FinancialPanel } from './features/financial/FinancialPanel';
import { clearApiAuthToken, financialApiService, setApiAuthToken } from './services/api';
import { GlobalStyle } from './styles/GlobalStyle';
import { MainContainer } from './pages/Accepted/styles';
import {
  AuthTopBar,
  ErrorBox,
  LoginButton,
  LoginCard,
  LoginInput,
  LoginSubtitle,
  LoginTag,
  LoginTitle,
  LoginWrapper,
  LogoutTopButton,
  SectionButton,
  SectionTabs,
} from './App.styles';

type AppSection = 'leads' | 'financial';
const AUTH_STORAGE_KEY = 'lead_management_auth_session';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LeadStatus>('invited');
  const [activeSection, setActiveSection] = useState<AppSection>('leads');
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [authToken, setAuthToken] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored) as { token?: string };
      if (parsed.token) {
        setAuthToken(parsed.token);
        setApiAuthToken(parsed.token);
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }, []);

  const handleLogin = async () => {
    setAuthLoading(true);
    setAuthError('');
    try {
      const response = await financialApiService.login({ username, password });
      setAuthToken(response.token);
      setApiAuthToken(response.token);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ token: response.token }));
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Falha no login');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken('');
    clearApiAuthToken();
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setActiveSection('leads');
  };

  return (
    <LeadsProvider>
      <GlobalStyle />
      {authToken.length < 10 ? (
          <LoginWrapper>
            <LoginCard>
              <LoginTag>Plataforma Corporativa</LoginTag>
              <LoginTitle>Acesso seguro</LoginTitle>
              <LoginSubtitle>Acesse com sua conta corporativa para consultar e operar os módulos de Leads e Financeiro.</LoginSubtitle>
              <LoginInput value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Usuário" />
              <LoginInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" />
              <LoginButton onClick={handleLogin} disabled={authLoading}>
                {authLoading ? 'Entrando...' : 'Entrar no sistema'}
              </LoginButton>
              {authError && <ErrorBox>{authError}</ErrorBox>}
            </LoginCard>
          </LoginWrapper>
      ) : (
        <MainContainer>
          <>
        <AuthTopBar>
          <LogoutTopButton onClick={handleLogout}>Sair</LogoutTopButton>
        </AuthTopBar>
        <SectionTabs>
          <SectionButton $active={activeSection === 'leads'} onClick={() => setActiveSection('leads')}>
            Gestão de Leads
          </SectionButton>
          <SectionButton $active={activeSection === 'financial'} onClick={() => setActiveSection('financial')}>
            Financeiro
          </SectionButton>
        </SectionTabs>
        {activeSection === 'leads' ? (
          <>
            <Tabs active={activeTab} onChange={setActiveTab} />
            <LeadList status={activeTab} />
          </>
        ) : (
          <FinancialPanel token={authToken} onSessionExpired={handleLogout} />
        )}
          </>
        </MainContainer>
      )}
    </LeadsProvider>
  );
};

export default App;
