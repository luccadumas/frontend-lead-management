import styled, { keyframes } from 'styled-components';
import type { ToastType } from './index';

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`;

const getBackgroundColor = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return '#4caf50';
    case 'error':
      return '#f44336';
    case 'warning':
      return '#ff9800';
    case 'info':
      return '#2196f3';
    default:
      return '#2196f3';
  }
};

export const ToastContainer = styled.div<{ type: ToastType }>`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: ${({ type }) => getBackgroundColor(type)};
  color: white;
  padding: 16px 24px;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  animation: ${slideIn} 0.3s ease-in-out;
  min-width: 200px;
  max-width: 400px;

  &.closing {
    animation: ${slideOut} 0.3s ease-in-out forwards;
  }
`;

export const ToastMessage = styled.p`
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
`; 