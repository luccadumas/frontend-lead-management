import styled from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

export const PaginationButton = styled.button`
  padding: 6px 16px;
  border: none;
  border-radius: 4px;
  background: #eee;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  &:disabled {
    background: #f0f0f0;
    color: #aaa;
    cursor: not-allowed;
  }
`; 
