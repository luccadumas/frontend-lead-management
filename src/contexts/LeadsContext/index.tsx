import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Lead } from './types';

interface State {
  leads: Lead[];
}

type Action =
  | { type: 'ACCEPT_LEAD'; id: string }
  | { type: 'DECLINE_LEAD'; id: string };

const initialLeads: Lead[] = [
  {
    id: '5577421',
    firstName: 'Bill',
    date: 'January 4 @ 2:37 pm',
    suburb: 'Yanderra 2574',
    category: 'Painters',
    description: 'Need to paint 2 aluminum windows and a sliding glass door',
    price: 62,
    status: 'invited',
  },
  {
    id: '5588872',
    firstName: 'Craig',
    date: 'January 4 @ 1:15 pm',
    suburb: 'Woolooware 2230',
    category: 'Interior Painters',
    description: 'internal walls 3 colours',
    price: 49,
    status: 'invited',
  },
  {
    id: '5141895',
    firstName: 'Pete',
    lastName: '',
    date: 'September 5 2018 @ 10:36 am',
    suburb: 'Carramar 6031',
    category: 'General Building Work',
    description: 'Plaster exposed brick walls (see photos), square off 2 archways (see photos), and expand pantry (see photos).',
    price: 26,
    status: 'accepted',
    phone: '0412345678',
    email: 'fake@mailinator.com',
  },
  {
    id: '5121931',
    firstName: 'Chris',
    lastName: 'Sanderson',
    date: 'August 30 2018 @ 11:14 am',
    suburb: 'Quinns Rocks 6030',
    category: 'Home Renovations',
    description: 'There is a two story building at the front of the main house that\'s about 10x5 that would like to convert into self contained living area.',
    price: 32,
    status: 'accepted',
    phone: '04987654321',
    email: 'another.fake@hipmail.com',
  },
];

const LeadContext = createContext<{
  leads: Lead[];
  acceptLead: (id: string) => void;
  declineLead: (id: string) => void;
} | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ACCEPT_LEAD': {
      return {
        leads: state.leads.map(lead =>
          lead.id === action.id
            ? {
                ...lead,
                status: 'accepted',
                price: lead.price > 500 ? lead.price * 0.9 : lead.price,
                phone: lead.phone || '0412345678',
                email: lead.email || 'fake@mailinator.com',
              }
            : lead
        ),
      };
    }
    case 'DECLINE_LEAD': {
      return {
        leads: state.leads.map(lead =>
          lead.id === action.id ? { ...lead, status: 'declined' } : lead
        ),
      };
    }
    default:
      return state;
  }
}

export const LeadProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, { leads: initialLeads });

  const acceptLead = (id: string) => {
    dispatch({ type: 'ACCEPT_LEAD', id });
  };
  const declineLead = (id: string) => {
    dispatch({ type: 'DECLINE_LEAD', id });
  };

  return (
    <LeadContext.Provider value={{ leads: state.leads, acceptLead, declineLead }}>
      {children}
    </LeadContext.Provider>
  );
};

export const useLeads = () => {
  const context = useContext(LeadContext);
  if (!context) throw new Error('useLeads must be used within LeadProvider');
  return context;
}; 