import styled, { keyframes } from 'styled-components';
import type { ToastType } from './types';
import { Theme } from '@/styles/theme';

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

const getBackgroundColor = (type: ToastType, theme: Theme): string => {
  switch (type) {
    case 'success':
      return theme.colors.success;
    case 'error':
      return theme.colors.error;
    case 'warning':
      return theme.colors.warning;
    case 'info':
      return theme.colors.primary;
    default:
      return theme.colors.primary;
  }
};

export const ToastContainer = styled.div<{ type: ToastType }>`
  position: fixed;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background-color: ${({ type, theme }) => getBackgroundColor(type, theme)};
  color: ${({ theme }) => theme.colors.background};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: ${({ theme }) => theme.shadows.md};
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
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  line-height: 1.5;
`; 
