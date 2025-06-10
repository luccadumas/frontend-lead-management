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
- Yarn package manager

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend-lead-management
```

2. Install dependencies:
```bash
yarn install
```

3. Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
yarn dev
```

The application will be available at `http://localhost:5173`

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_URL | Backend API URL | http://localhost:3000 |

## Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix ESLint issues
- `yarn type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── assets/         # Static assets (icons, images)
├── components/     # Reusable components
├── contexts/       # React contexts
├── features/       # Feature-specific components
├── services/       # API services
└── styles/         # Global styles
```

## Tech Stack

- React 18
- TypeScript
- Vite
- Styled Components
- ESLint
- Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
