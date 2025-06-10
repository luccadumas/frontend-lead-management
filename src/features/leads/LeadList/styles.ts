import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #f7f7f7;
  margin-bottom: 24px;
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: #666;
  padding: 32px;
  font-size: 1.1rem;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LoadingCard = styled.div`
  background: #fff;
  border: 1px solid #E2E2E2;
  border-radius: 4px;
  padding: 16px;
  height: 200px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: ${shimmer} 1.5s infinite;
  }
`; 
