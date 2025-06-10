import { useState, useEffect, useMemo, useCallback } from 'react';
import { useLeads } from '@/contexts/LeadsContext';
import type { Lead } from '@/contexts/LeadsContext/types';
import type { LeadStatus } from '@/contexts/LeadsContext/types';
import { useErrorHandler } from '@/hooks/useErrorHandler';

export const useLeadList = (status: LeadStatus) => {
  const { leads = [], loading, fetchLeads, acceptLead, declineLead } = useLeads();
  const { error, handleError, clearError } = useErrorHandler();
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    const loadLeads = async () => {
      try {
        clearError();
        await fetchLeads(status);
      } catch (err) {
        handleError(err);
      }
    };
    loadLeads();
  }, [fetchLeads, status, clearError, handleError]);

  const filteredLeads = useMemo(() => 
    leads.filter((lead: Lead) => lead.status === status), 
    [leads, status]
  );

  const paginatedLeads = useMemo(() => 
    filteredLeads.slice((page - 1) * pageSize, page * pageSize), 
    [filteredLeads, page]
  );

  const totalPages = Math.ceil(filteredLeads.length / pageSize);

  const handleAccept = useCallback(async (id: string) => {
    try {
      clearError();
      if (acceptLead) await acceptLead(id);
    } catch (err) {
      handleError(err);
    }
  }, [acceptLead, clearError, handleError]);

  const handleDecline = useCallback(async (id: string) => {
    try {
      clearError();
      if (declineLead) await declineLead(id);
    } catch (err) {
      handleError(err);
    }
  }, [declineLead, clearError, handleError]);

  const handlePrevPage = useCallback(() => {
    setPage(p => Math.max(1, p - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage(p => Math.min(totalPages, p + 1));
  }, [totalPages]);

  return {
    loading,
    error,
    paginatedLeads,
    totalPages,
    page,
    handleAccept,
    handleDecline,
    handlePrevPage,
    handleNextPage,
    filteredLeads
  };
}; 
