import styled from 'styled-components';

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  width: calc(100% + ${({ theme }) => `calc(${theme.spacing.lg} * 2)`});
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 0 -${({ theme }) => theme.spacing.lg};
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  padding-top: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const Avatar = styled.div`
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: ${({ theme }) => theme.typography.sizes['2xl']};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.backgroundAlt};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const EmptyMessage = styled.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  min-height: 40px;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const Name = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  margin-right: ${({ theme }) => theme.spacing.sm};
`;

export const Info = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  margin-right: ${({ theme }) => theme.spacing.md};
  font-weight: ${({ theme }) => theme.typography.weights.semibold};
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
  }
`;

export const Description = styled.div`
  margin: ${({ theme }) => theme.spacing.sm} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  max-width: 85%;
`;

export const Price = styled.div`
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-left: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
  span {
    font-weight: ${({ theme }) => theme.typography.weights.regular};
  }
`;

export const PriceAccepted = styled.div`
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.sizes.sm};
`;

export const Button = styled.button<{primary?: boolean}>`
  background: ${({ primary, theme }) => (primary ? theme.colors.primary : theme.colors.border)};
  color: ${({ primary, theme }) => (primary ? theme.colors.background : theme.colors.text.primary)};
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  margin-right: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  transition: opacity 0.2s ease;
  
  &:hover {
    opacity: 0.9;
    background: ${({ primary, theme }) => (primary ? theme.colors.primary : theme.colors.background)};
  }
`;

export const Icon = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.lg};
  display: inline-flex;
  vertical-align: middle;
  margin-right: ${({ theme }) => theme.spacing.xs};
  svg {
    display: block;
  }
`; 

