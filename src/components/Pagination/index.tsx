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
    <PaginationButton onClick={onPrev} disabled={page === 1} aria-label="Página anterior">
      Anterior
    </PaginationButton>
    <span>Página {page} de {totalPages}</span>
    <PaginationButton onClick={onNext} disabled={page === totalPages} aria-label="Próxima página">
      Próxima
    </PaginationButton>
  </PaginationContainer>
); 
