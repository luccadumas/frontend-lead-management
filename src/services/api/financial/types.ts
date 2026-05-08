export type FinancialAuthRequest = {
  username: string;
  password: string;
};

export type FinancialAuthResponse = {
  token: string;
  tokenType: string;
  role: string;
};

export type SalesRepresentative = {
  id: number;
  name: string;
  email: string;
  commissionRate: number;
};

export type CreateSalesRepresentativeRequest = {
  name: string;
  email: string;
  commissionRate: number;
};

export type CommissionEntry = {
  id: number;
  salesRepresentativeId: number;
  salesRepresentativeName: string;
  leadName: string;
  contractValue: number;
  commissionValue: number;
  createdAt: string;
};

export type CreateCommissionRequest = {
  leadName: string;
  contractValue: number;
};

export type CommissionSummary = {
  salesRepresentativeId: number;
  salesRepresentativeName: string;
  createdAt: string;
  totalContractValue: number;
  totalCommissionValue: number;
  totalDeals: number;
};

export type CommissionSummaryResponse = {
  startDate: string;
  endDate: string;
  summaries: CommissionSummary[];
};
