export interface TabsProps {
  active: 'invited' | 'accepted' | 'declined';
  onChange: (tab: 'invited' | 'accepted') => void;
} 
