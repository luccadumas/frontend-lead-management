import type { Meta, StoryObj } from '@storybook/react';
import { LeadCard } from './index';

const meta: Meta<typeof LeadCard> = {
  title: 'Components/LeadCard',
  component: LeadCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LeadCard>;

export const Invited: Story = {
  args: {
    name: 'John Doe',
    date: '2024-02-20',
    suburb: 'Sydney',
    category: 'Plumbing',
    jobId: 12345,
    description: 'Fix leaking pipe',
    price: 100,
    accepted: false,
    onAccept: () => alert('Accept clicked'),
    onDecline: () => alert('Decline clicked'),
  },
};

export const Accepted: Story = {
  args: {
    name: 'John Doe',
    date: '2024-02-20',
    suburb: 'Sydney',
    category: 'Plumbing',
    jobId: 12345,
    description: 'Fix leaking pipe',
    price: 100,
    accepted: true,
    phone: '+61 123 456 789',
    email: 'john.doe@example.com',
  },
}; 
