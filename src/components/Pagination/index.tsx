import React from 'react';
import { PaginationContainer, PaginationButton } from './styles';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPrev, onNext }) => (
  <PaginationContainer>
    <PaginationButton onClick={onPrev} disabled={page === 1} aria-label="Previous page">
      Previous
    </PaginationButton>
    <span>Page {page} of {totalPages}</span>
    <PaginationButton onClick={onNext} disabled={page === totalPages} aria-label="Next page">
      Next
    </PaginationButton>
  </PaginationContainer>
); 
