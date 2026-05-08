import type {
  CommissionEntry,
  CommissionSummaryResponse,
  CreateCommissionRequest,
  CreateSalesRepresentativeRequest,
  FinancialAuthRequest,
  FinancialAuthResponse,
  SalesRepresentative,
} from './types';
import { apiRequest } from '../api';

const financialHost = (import.meta.env.VITE_FINANCIAL_API_URL || 'http://localhost:8080').replace(/\/+$/, '');

export const financialApiService = {
  login: (payload: FinancialAuthRequest) =>
    apiRequest<FinancialAuthResponse>(`${financialHost}/api/v1/auth/login`, { method: 'POST', body: payload }),

  createSalesRepresentative: (token: string, payload: CreateSalesRepresentativeRequest) =>
    apiRequest<SalesRepresentative>(`${financialHost}/api/v1/financial/sales-representatives`, {
      method: 'POST',
      body: payload,
      token,
    }),

  listSalesRepresentatives: (token: string) =>
    apiRequest<SalesRepresentative[]>(`${financialHost}/api/v1/financial/sales-representatives`, { token }),

  createCommission: (token: string, salesRepresentativeId: number, payload: CreateCommissionRequest) =>
    apiRequest<CommissionEntry>(`${financialHost}/api/v1/financial/sales-representatives/${salesRepresentativeId}/commissions`, {
      method: 'POST',
      body: payload,
      token,
    }),

  listCommissionsBySalesRepresentative: (token: string, salesRepresentativeId: number) =>
    apiRequest<CommissionEntry[]>(`${financialHost}/api/v1/financial/sales-representatives/${salesRepresentativeId}/commissions`, {
      token,
    }),

  summarizeCommissions: (token: string, startDate: string, endDate: string) => {
    const url = new URL(`${financialHost}/api/v1/financial/commissions/summary`);
    url.searchParams.set('startDate', startDate);
    url.searchParams.set('endDate', endDate);
    return apiRequest<CommissionSummaryResponse>(url.toString(), { token });
  },
};
