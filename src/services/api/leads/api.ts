import type { LeadStatus } from '@/contexts/LeadsContext/types';
import type { CreateLeadDTO, UpdateLeadDTO, LeadsApi } from './types';

class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      response.status,
      error.message || 'An unexpected error occurred',
      error
    );
  }
  return response.json();
};

const BASE_URL = '/api/leads';

export const leadsApi: LeadsApi = {
  create: async (data: CreateLeadDTO) => {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  list: async () => {
    const response = await fetch(BASE_URL);
    return handleResponse(response);
  },

  getByStatus: async (status: LeadStatus) => {
    const response = await fetch(`${BASE_URL}?status=${status}`);
    return handleResponse(response);
  },

  getById: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`);
    return handleResponse(response);
  },

  accept: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}/accept`, {
      method: 'PATCH',
    });
    return handleResponse(response);
  },

  decline: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}/decline`, {
      method: 'PATCH',
    });
    return handleResponse(response);
  },

  update: async (id: string, data: UpdateLeadDTO) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return handleResponse(response);
  },

  delete: async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    await handleResponse(response);
  },
}; 
