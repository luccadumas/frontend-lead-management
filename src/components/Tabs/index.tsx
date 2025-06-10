import React from 'react';
import { TabsWrapper, Tab } from './styles';
import type { TabsProps } from './types';

export const Tabs: React.FC<TabsProps> = ({active, onChange}) => (
  <TabsWrapper>
    <Tab $active={active === 'invited'} onClick={() => onChange('invited')}>Invited</Tab>
    <Tab $active={active === 'accepted'} onClick={() => onChange('accepted')}>Accepted</Tab>
  </TabsWrapper>
); 
