import { BrainCircuit, Users, PlayCircle, Briefcase, HeartPulse, type LucideProps, HelpCircle, Car, ShoppingCart, Building, Cog, Store } from 'lucide-react';
import type { ComponentType } from 'react';

export const platformIcons: { [key: string]: ComponentType<LucideProps> } = {
  'E-Learning': BrainCircuit,
  'Social Media': Users,
  'Streaming': PlayCircle,
  'Freelance': Briefcase,
  'Telehealth': HeartPulse,
  'Automotive': Car,
  'IT': Cog,
  'Entertainment': PlayCircle,
  'Industrial': Building,
  'Grocery': ShoppingCart,
  'E-commerce': Store,
  'Service Based': Briefcase,
};

export const PlatformIcon = ({ category, ...props }: { category: string } & LucideProps) => {
  const Icon = platformIcons[category] || HelpCircle;
  return <Icon {...props} />;
};
