import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Lead, LeadStatus } from './types';
import { leadsApi } from '@/services/api';

interface LeadsContextType {
  leads: Lead[];
  loading: boolean;
  error: string | null;
  fetchLeads: (status?: LeadStatus) => Promise<void>;
  acceptLead: (id: string) => Promise<void>;
  declineLead: (id: string) => Promise<void>;
}

const LeadsContext = createContext<LeadsContextType | undefined>(undefined);

export const LeadsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLeads = useCallback(async (status?: LeadStatus) => {
    try {
      setLoading(true);
      setError(null);
      const response = status 
        ? await leadsApi.getByStatus(status)
        : await leadsApi.list();
      setLeads(response);
    } catch (err) {
      setError('Failed to fetch leads');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const acceptLead = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await leadsApi.accept(id);
      await fetchLeads();
    } catch (err) {
      setError('Failed to accept lead');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [fetchLeads]);

  const declineLead = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await leadsApi.decline(id);
      await fetchLeads();
    } catch (err) {
      setError('Failed to decline lead');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [fetchLeads]);

  return (
    <LeadsContext.Provider value={{ leads, loading, error, fetchLeads, acceptLead, declineLead }}>
      {children}
    </LeadsContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadsContext);
  if (context === undefined) {
    throw new Error('useLeads must be used within a LeadsProvider');
  }
  return context;
}; 
