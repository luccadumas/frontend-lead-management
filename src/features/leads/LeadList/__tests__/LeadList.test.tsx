import { render, screen, waitFor } from '@testing-library/react';
import { LeadList } from '../index';
import { useLeads } from '@/contexts/LeadsContext';
import type { LeadCardProps } from '@/components/LeadCard/types';
import { useErrorHandler } from '@/hooks/useErrorHandler';

// Mock SVG imports with proper React components
jest.mock('@/assets/icons/location.svg?react', () => () => <div data-testid="location-icon" />);
jest.mock('@/assets/icons/briefcase.svg?react', () => () => <div data-testid="briefcase-icon" />);
jest.mock('@/assets/icons/phone.svg?react', () => () => <div data-testid="phone-icon" />);
jest.mock('@/assets/icons/email.svg?react', () => () => <div data-testid="email-icon" />);

// Mock the leads context
jest.mock('@/contexts/LeadsContext', () => ({
  useLeads: jest.fn(),
}));

// Mock the error handler hook
jest.mock('@/hooks/useErrorHandler', () => ({
  useErrorHandler: jest.fn(),
}));

// Mock the LeadCard component
jest.mock('@/components/LeadCard', () => ({
  LeadCard: ({ name, date, suburb, category, jobId, description, price, accepted, phone, email, onAccept, onDecline }: LeadCardProps) => (
    <div data-testid="lead-card">
      <div data-testid="name">{name}</div>
      <div data-testid="date">{date}</div>
      <div data-testid="suburb">{suburb}</div>
      <div data-testid="category">{category}</div>
      <div data-testid="job-id">Job ID: {jobId}</div>
      <div data-testid="description">{description}</div>
      <div data-testid="price">${price.toFixed(2)} Lead Invitation</div>
      {accepted && (
        <>
          {phone && <div data-testid="phone">{phone}</div>}
          {email && <div data-testid="email">{email}</div>}
        </>
      )}
      {!accepted && (
        <>
          <button data-testid="accept-button" onClick={onAccept}>Accept</button>
          <button data-testid="decline-button" onClick={onDecline}>Decline</button>
        </>
      )}
    </div>
  ),
}));

describe('LeadList', () => {
  const mockLeads = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      date: '2024-02-20',
      suburb: 'Sydney',
      category: 'Plumbing',
      jobId: 12345,
      description: 'Fix leaking pipe',
      price: 100,
      status: 'invited',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useErrorHandler as jest.Mock).mockReturnValue({
      error: null,
      handleError: jest.fn(),
      clearError: jest.fn(),
    });
  });

  it('should render loading state', () => {
    (useLeads as jest.Mock).mockReturnValue({
      leads: [],
      loading: true,
      error: null,
      fetchLeads: jest.fn(),
    });

    render(<LeadList status="invited" />);
    expect(screen.getAllByTestId('loading-card')).toHaveLength(3);
  });

  it('should render empty state', () => {
    (useLeads as jest.Mock).mockReturnValue({
      leads: [],
      loading: false,
      error: null,
      fetchLeads: jest.fn(),
    });

    render(<LeadList status="invited" />);
    expect(screen.getByText('No invited leads at this time.')).toBeInTheDocument();
  });

  it('should render leads', async () => {
    (useLeads as jest.Mock).mockReturnValue({
      leads: mockLeads,
      loading: false,
      error: null,
      fetchLeads: jest.fn(),
      acceptLead: jest.fn(),
      declineLead: jest.fn(),
    });

    render(<LeadList status="invited" />);
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  it('should handle API error', () => {
    const errorMessage = 'Failed to fetch leads';
    (useLeads as jest.Mock).mockReturnValue({
      leads: [],
      loading: false,
      error: null,
      fetchLeads: jest.fn(),
    });

    (useErrorHandler as jest.Mock).mockReturnValue({
      error: { message: errorMessage },
      handleError: jest.fn(),
      clearError: jest.fn(),
    });

    render(<LeadList status="invited" />);
    
    const errorElement = screen.getByTestId('error-message');
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveTextContent(errorMessage);
  });
});
