import styled from 'styled-components';

export const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

export const Tab = styled.button<{$active: boolean}>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} 0;
  background: none;
  border: none;
  border-bottom: 3px solid ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  font-weight: ${({ $active, theme }) => ($active ? theme.typography.weights.semibold : theme.typography.weights.regular)};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    font-weight: ${({ $active, theme }) => ($active ? theme.typography.weights.semibold : theme.typography.weights.medium)};
  }
`; 
