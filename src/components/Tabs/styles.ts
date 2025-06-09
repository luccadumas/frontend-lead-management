import styled from 'styled-components';

export const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 2px solid #eee;
  margin-bottom: 24px;
`;
export const Tab = styled.button<{$active: boolean}>`
  flex: 1;
  padding: 16px 0;
  background: none;
  border: none;
  border-bottom: 3px solid ${({$active}) => ($active ? '#ff6600' : 'transparent')};
  color: ${({$active}) => ($active ? '#ff6600' : '#333')};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: border 0.2s;
`; 