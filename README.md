# Lead Management System

A modern React-based lead management system built with TypeScript, featuring a clean UI and robust state management.

## Features

- 📱 Responsive design
- 🎨 Modern UI with styled-components
- 🔒 Type-safe with TypeScript
- 📊 Lead status management (Invited, Accepted, Declined)
- 🔄 Real-time updates
- ♿ Accessibility-first approach

## Prerequisites

- Node.js (v18 or higher)
- npm or Yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-lead-management
```

2. Install dependencies:

Using npm:
```bash
npm install
```

Or using Yarn:
```bash
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:

Using npm:
```bash
npm run dev
```

Or using Yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

The project uses environment variables for configuration. Copy the example files and adjust the values according to your environment:

```bash
# Copy example files
cp .env.example .env
cp .env.development.example .env.development
```

### Available Environment Variables

#### Common Variables (.env.example)
```env
# API Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=5000

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true

# Authentication
VITE_AUTH_TOKEN_KEY=auth_token
VITE_REFRESH_TOKEN_KEY=refresh_token

# Environment
NODE_ENV=development
```

#### Development Variables (.env.development.example)
```env
# Development Environment Configuration
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=10000

# Development Features
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_NOTIFICATIONS=true
VITE_ENABLE_MOCK_API=true

# Development Authentication
VITE_AUTH_TOKEN_KEY=auth_token_dev
VITE_REFRESH_TOKEN_KEY=refresh_token_dev

# Environment
NODE_ENV=development
```

### Important Notes
- Never commit `.env` files to version control
- Keep `.env.example` and `.env.development.example` updated with new variables
- Use `VITE_` prefix for variables that should be accessible in the frontend code
- Sensitive information should be stored in `.env` files and not in example files

## Available Scripts

Using npm:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Run TypeScript type checking
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

Using Yarn:
- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn type-check` - Run TypeScript type checking
- `yarn test` - Run tests
- `yarn test:watch` - Run tests in watch mode
- `yarn test:coverage` - Run tests with coverage report

## Testing

The project uses Jest and React Testing Library for testing. The test suite includes:

### LeadCard Component Tests

```typescript
describe('LeadCard', () => {
  // Test contact information display
  it('should display contact information when lead is accepted', () => {
    // Verifies that phone and email are shown when lead is accepted
  });

  // Test accept button functionality
  it('should call onAccept when Accept button is clicked', () => {
    // Verifies that the accept callback is called
  });

  // Test decline button functionality
  it('should call onDecline when Decline button is clicked', () => {
    // Verifies that the decline callback is called
  });

  // Test button visibility
  it('should not show Accept/Decline buttons when lead is accepted', () => {
    // Verifies that action buttons are hidden for accepted leads
  });
});
```

### LeadList Component Tests

```typescript
describe('LeadList', () => {
  // Test loading state
  it('should render loading state', () => {
    // Verifies that loading cards are displayed
  });

  // Test empty state
  it('should render empty state', () => {
    // Verifies that appropriate message is shown when no leads are available
  });

  // Test leads rendering
  it('should render leads', async () => {
    // Verifies that leads are properly displayed
  });

  // Test error handling
  it('should handle API error', () => {
    // Verifies that error messages are properly displayed
  });
});
```

## Project Structure

```
src/
├── assets/         # Static assets (icons, images)
├── components/     # Reusable components
├── contexts/       # React contexts
├── features/       # Feature-specific components
│   └── leads/      # Lead management feature
├── pages/          # Page components
├── services/       # API services
│   └── api/        # API client and endpoints
├── styles/         # Global styles
├── types/          # TypeScript type definitions
├── App.tsx         # Root component
├── main.tsx        # Application entry point
└── vite-env.d.ts   # Vite type declarations
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Styled Components
- ESLint
- Prettier
- Jest
- React Testing Library

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Storybook

This project uses [Storybook](https://storybook.js.org/) for component documentation and isolated visualization.

### How to run Storybook

```bash
yarn storybook
```

Storybook will be available at [http://localhost:6006](http://localhost:6006).

### Recommended structure for stories

`.stories.tsx` files should be kept alongside their corresponding component, for example:

```
src/components/LeadCard/
  ├── index.tsx
  ├── LeadCard.stories.tsx
  └── ...
```

### Example story

```tsx
// src/components/LeadCard/LeadCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { LeadCard } from './index';

const meta: Meta<typeof LeadCard> = {
  title: 'Components/LeadCard',
  component: LeadCard,
  parameters: { layout: 'centered' },
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
```

### Storybook advantages
- Isolated component visualization
- Live and interactive documentation
- Facilitates visual testing and UI review
