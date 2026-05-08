import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Lead, LeadStatus, LeadsContextType } from './types';
import { leadsApi } from '@/services/api';


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
      setError('Falha ao carregar leads');
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
      setError('Falha ao aceitar lead');
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
      setError('Falha ao recusar lead');
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
    throw new Error('useLeads precisa ser usado dentro de LeadsProvider');
  }
  return context;
}; 
