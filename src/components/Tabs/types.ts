export interface TabsProps {
  active: 'invited' | 'accepted';
  onChange: (tab: 'invited' | 'accepted') => void;
} 
