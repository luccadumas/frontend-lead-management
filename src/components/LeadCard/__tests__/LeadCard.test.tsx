import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LeadCard } from '../index';

// Mock SVG imports with proper React components
jest.mock('@/assets/icons/location.svg?react', () => () => <div data-testid="location-icon" />);
jest.mock('@/assets/icons/briefcase.svg?react', () => () => <div data-testid="briefcase-icon" />);
jest.mock('@/assets/icons/phone.svg?react', () => () => <div data-testid="phone-icon" />);
jest.mock('@/assets/icons/email.svg?react', () => () => <div data-testid="email-icon" />);

// Mock styled components
jest.mock('../styles', () => ({
  Card: ({ children }: { children: React.ReactNode }) => <div data-testid="card">{children}</div>,
  Header: ({ children }: { children: React.ReactNode }) => <div data-testid="header">{children}</div>,
  Avatar: ({ children }: { children: React.ReactNode }) => <div data-testid="avatar">{children}</div>,
  Row: ({ children }: { children: React.ReactNode }) => <div data-testid="row">{children}</div>,
  Name: ({ children }: { children: React.ReactNode }) => <div data-testid="name">{children}</div>,
  Info: ({ children }: { children: React.ReactNode }) => <div data-testid="info">{children}</div>,
  Description: ({ children }: { children: React.ReactNode }) => <div data-testid="description">{children}</div>,
  Price: ({ children }: { children: React.ReactNode }) => <div data-testid="price">{children}</div>,
  PriceAccepted: ({ children }: { children: React.ReactNode }) => <div data-testid="price-accepted">{children}</div>,
  Button: ({ children, onClick, primary }: { children: React.ReactNode; onClick?: () => void; primary?: boolean }) => (
    <button data-testid={primary ? 'accept-button' : 'decline-button'} onClick={onClick}>
      {children}
    </button>
  ),
  Divider: () => <hr data-testid="divider" />,
  Icon: ({ children }: { children: React.ReactNode }) => <div data-testid="icon">{children}</div>,
}));

describe('LeadCard', () => {
  const mockProps = {
    name: 'John Doe',
    date: '2024-02-20',
    suburb: 'Sydney',
    category: 'Plumbing',
    jobId: 12345,
    description: 'Fix leaking pipe',
    price: 100,
    accepted: false,
    onAccept: jest.fn(),
    onDecline: jest.fn(),
  };

  it('should display contact information when lead is accepted', () => {
    const acceptedProps = {
      ...mockProps,
      accepted: true,
      phone: '0412345678',
      email: 'john@example.com',
    };

    render(<LeadCard {...acceptedProps} />);

    expect(screen.getByText('0412345678')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should call onAccept when Accept button is clicked', () => {
    render(<LeadCard {...mockProps} />);

    fireEvent.click(screen.getByTestId('accept-button'));
    expect(mockProps.onAccept).toHaveBeenCalledTimes(1);
  });

  it('should call onDecline when Decline button is clicked', () => {
    render(<LeadCard {...mockProps} />);

    fireEvent.click(screen.getByTestId('decline-button'));
    expect(mockProps.onDecline).toHaveBeenCalledTimes(1);
  });

  it('should not show Accept/Decline buttons when lead is accepted', () => {
    const acceptedProps = {
      ...mockProps,
      accepted: true,
    };

    render(<LeadCard {...acceptedProps} />);

    expect(screen.queryByTestId('accept-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('decline-button')).not.toBeInTheDocument();
  });
});
