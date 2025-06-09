import styled from 'styled-components';

export const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #eee;
  margin-bottom: 24px;
  background-color: #ffffff;
  border: 1px solid #E2E2E2;
`;

export const Tab = styled.button<{$active: boolean}>`
  flex: 1;
  padding: 16px 0;
  background: none;
  border: none;
  border-bottom: 3px solid ${({$active}) => ($active ? '#ff6600' : 'transparent')};
  color: #333;
  font-size: 1.1rem;
  font-weight: ${({$active}) => ($active ? '600' : '400')};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  
  &:hover {
    font-weight: ${({$active}) => ($active ? '600' : '500')};
  }
`; 