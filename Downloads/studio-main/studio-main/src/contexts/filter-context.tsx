
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type FilterContextType = {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  selectedPlatform: string | null;
  setSelectedPlatform: (platform: string | null) => void;
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  return (
    <FilterContext.Provider
      value={{
        selectedCategory,
        setSelectedCategory,
        selectedPlatform,
        setSelectedPlatform,
        selectedRegion,
        setSelectedRegion,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FilterContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FilterProvider');
  }
  return context;
}
