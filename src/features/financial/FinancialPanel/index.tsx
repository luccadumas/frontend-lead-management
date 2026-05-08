import React, { useEffect, useState } from 'react';
import { financialApiService } from '@/services/api';
import type { CommissionEntry, CommissionSummary, SalesRepresentative } from '@/services/api/financial/types';
import {
  ButtonRow,
  Card,
  CardTitle,
  ErrorBox,
  HeaderSelectLabel,
  HeaderSelectWrapper,
  Input,
  InputRow,
  InnerTabButton,
  InnerTabs,
  Meta,
  PanelHeader,
  PanelWrapper,
  PrimaryButton,
  RightAction,
  Select,
  SummaryTable,
  SummaryTableWrapper,
  SuccessButton,
  Title,
} from './styles';

const todayIso = new Date().toISOString();
const toDateInputValue = (isoDate: string) => isoDate.slice(0, 10);
const toBrazilianDate = (dateValue: string) => {
  if (!dateValue) return '';
  const [year, month, day] = dateValue.split('-');
  return `${day}/${month}/${year}`;
};
const toBrazilianDateTime = (isoDate: string) =>
  new Date(isoDate).toLocaleString('pt-BR');
const toCurrency = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

type FinancialPanelProps = {
  token: string;
  onSessionExpired: () => void;
};

export const FinancialPanel: React.FC<FinancialPanelProps> = ({ token, onSessionExpired }) => {
  const [activePage, setActivePage] = useState<'operacoes' | 'cadastro'>('operacoes');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);

  const [repName, setRepName] = useState('Maria Silva');
  const [repEmail, setRepEmail] = useState('maria.silva@empresa.com');
  const [repRate, setRepRate] = useState('8.5');
  const [representatives, setRepresentatives] = useState<SalesRepresentative[]>([]);
  const [selectedRepId, setSelectedRepId] = useState<number | null>(null);

  const [leadName, setLeadName] = useState('Loja XPTO');
  const [contractValue, setContractValue] = useState('12500');
  const [commissions, setCommissions] = useState<CommissionEntry[]>([]);

  const [startDate, setStartDate] = useState('2026-01-01');
  const [endDate, setEndDate] = useState(toDateInputValue(todayIso));
  const [summaries, setSummaries] = useState<CommissionSummary[]>([]);

  const withHandling = async (fn: () => Promise<void>) => {
    setLoading(true);
    setError('');
    setNotice('');
    try {
      await fn();
    } catch (err) {
      const status = (err as { status?: number })?.status;
      if (status === 401 || status === 403) {
        onSessionExpired();
        return;
      }
      const message = status === 403
        ? 'Não foi possível acessar este recurso agora. Verifique sua sessão e o backend.'
        : err instanceof Error
        ? err.message
        : 'Erro inesperado ao comunicar com o financeiro';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadInitialRepresentatives = async () => {
      if (!token) return;
      setLoading(true);
      setError('');
      setNotice('');
      try {
        const items = await financialApiService.listSalesRepresentatives(token);
        setRepresentatives(items);
        if (items.length > 0) {
          setSelectedRepId(items[0].id);
        } else {
          setNotice('Crie um vendedor para registrar e listar comissões.');
        }
      } catch (err) {
        const status = (err as { status?: number })?.status;
        if (status === 401 || status === 403) {
          onSessionExpired();
          return;
        }
        const message = err instanceof Error ? err.message : 'Erro inesperado ao comunicar com o financeiro';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void loadInitialRepresentatives();
  }, [token, onSessionExpired]);

  const handleCreateRepresentative = async () => {
    if (!token) return;
    await withHandling(async () => {
      const created = await financialApiService.createSalesRepresentative(token, {
        name: repName,
        email: repEmail,
        commissionRate: Number(repRate),
      });
      setSelectedRepId(created.id);
      setRepresentatives((prev) => [created, ...prev.filter((item) => item.id !== created.id)]);
      setNotice('Vendedor criado com sucesso.');
    });
  };

  const handleCreateCommission = async () => {
    if (!token) return;
    if (selectedRepId === null) {
      setError('Selecione um vendedor antes de criar comissão.');
      return;
    }
    await withHandling(async () => {
      const created = await financialApiService.createCommission(token, selectedRepId, {
        leadName,
        contractValue: Number(contractValue),
      });
      setCommissions((prev) => [created, ...prev]);
      setNotice('Comissão criada com sucesso.');
    });
  };

  const handleLoadSummary = async () => {
    if (!token) return;
    await withHandling(async () => {
      const summary = await financialApiService.summarizeCommissions(
        token,
        `${startDate}T00:00:00Z`,
        `${endDate}T23:59:59.999Z`
      );
      setSummaries(summary.summaries);
      setNotice(summary.summaries.length > 0 ? 'Resumo carregado.' : 'Resumo vazio para o período informado.');
    });
  };

  useEffect(() => {
    const loadCommissionsForSelectedRepresentative = async () => {
      if (!token) return;
      if (selectedRepId === null) {
        setCommissions([]);
        return;
      }
      setLoading(true);
      setError('');
      setNotice('');
      try {
        const items = await financialApiService.listCommissionsBySalesRepresentative(token, selectedRepId);
        setCommissions(items);
        setNotice(items.length > 0 ? '' : 'Nenhuma comissão encontrada para esse vendedor.');
      } catch (err) {
        const status = (err as { status?: number })?.status;
        if (status === 401 || status === 403) {
          onSessionExpired();
          return;
        }
        const message = status === 403
          ? 'Não foi possível carregar as comissões automaticamente. Verifique sessão/permissões.'
          : err instanceof Error
          ? err.message
          : 'Erro inesperado ao comunicar com o financeiro';
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void loadCommissionsForSelectedRepresentative();
  }, [selectedRepId, token, onSessionExpired]);

  return (
    <PanelWrapper>
      <PanelHeader>
        <div>
          <Title>Painel Financeiro</Title>
        </div>
        {activePage === 'operacoes' && (
          <HeaderSelectWrapper>
            <HeaderSelectLabel>Vendedor selecionado</HeaderSelectLabel>
            <Select value={selectedRepId ?? ''} onChange={(e) => setSelectedRepId(Number(e.target.value))} disabled={representatives.length === 0}>
              {representatives.length === 0 ? (
                <option value="">Nenhum vendedor cadastrado</option>
              ) : (
                representatives.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    #{rep.id} - {rep.name} ({rep.commissionRate}%)
                  </option>
                ))
              )}
            </Select>
          </HeaderSelectWrapper>
        )}
      </PanelHeader>

      <InnerTabs>
        <InnerTabButton $active={activePage === 'operacoes'} onClick={() => setActivePage('operacoes')}>
          Operações
        </InnerTabButton>
        <InnerTabButton $active={activePage === 'cadastro'} onClick={() => setActivePage('cadastro')}>
          Cadastro de vendedor
        </InnerTabButton>
      </InnerTabs>

      {activePage === 'cadastro' ? (
        <Card>
          <CardTitle>Cadastro de vendedor</CardTitle>
          <Input value={repName} onChange={(e) => setRepName(e.target.value)} placeholder="Nome do vendedor" />
          <Input value={repEmail} onChange={(e) => setRepEmail(e.target.value)} placeholder="Email do vendedor" />
          <Input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={repRate}
            onChange={(e) => setRepRate(e.target.value)}
            placeholder="Taxa de comissão (%)"
          />
          <ButtonRow>
            <PrimaryButton onClick={handleCreateRepresentative} disabled={loading}>Criar vendedor</PrimaryButton>
          </ButtonRow>
        </Card>
      ) : (
        <>
          <Card>
            <CardTitle>Comissões</CardTitle>
            <Input value={leadName} onChange={(e) => setLeadName(e.target.value)} placeholder="Nome do lead/cliente" />
            <Input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={contractValue}
              onChange={(e) => setContractValue(e.target.value)}
              placeholder="Valor do contrato"
            />
          <RightAction>
            <PrimaryButton onClick={handleCreateCommission} disabled={selectedRepId === null || loading}>Criar comissão</PrimaryButton>
          </RightAction>
            <Meta>Registros encontrados: {commissions.length}</Meta>
            {commissions.length > 0 && (
              <div style={{ marginTop: '0.6rem', maxHeight: '180px', overflowY: 'auto' }}>
                {commissions.map((item) => (
                  <Meta key={item.id}>
                    #{item.id} - {item.leadName} - R$ {Number(item.commissionValue).toFixed(2)}
                  </Meta>
                ))}
              </div>
            )}
          </Card>

          <Card style={{ marginTop: '1rem' }}>
            <CardTitle>Resumo por período</CardTitle>
            <InputRow>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </InputRow>
        <RightAction>
          <SuccessButton onClick={handleLoadSummary} disabled={loading}>Buscar resumo</SuccessButton>
        </RightAction>
            <Meta>Período: {toBrazilianDate(startDate)} até {toBrazilianDate(endDate)}</Meta>
            <Meta>Linhas no resumo: {summaries.length}</Meta>
            {summaries.length > 0 && (
              <SummaryTableWrapper>
                <SummaryTable>
                  <thead>
                    <tr>
                      <th>Vendedor</th>
                      <th>Data de criação</th>
                      <th>Total de contratos</th>
                      <th>Total de comissões</th>
                      <th>Negócios</th>
                    </tr>
                  </thead>
                  <tbody>
                    {summaries.map((item) => (
                      <tr key={item.salesRepresentativeId}>
                        <td>{item.salesRepresentativeName}</td>
                        <td>{toBrazilianDateTime(item.createdAt)}</td>
                        <td>{toCurrency(Number(item.totalContractValue))}</td>
                        <td>{toCurrency(Number(item.totalCommissionValue))}</td>
                        <td>{item.totalDeals}</td>
                      </tr>
                    ))}
                  </tbody>
                </SummaryTable>
              </SummaryTableWrapper>
            )}
          </Card>
        </>
      )}

      {notice && <Meta style={{ marginTop: '1rem' }}>{notice}</Meta>}
      {error && <ErrorBox>{error}</ErrorBox>}
    </PanelWrapper>
  );
};
