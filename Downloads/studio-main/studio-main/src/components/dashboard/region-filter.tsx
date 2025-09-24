
'use client';

import { useFilters } from '@/contexts/filter-context';
import { regionalHotspotData } from '@/app/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMemo } from 'react';

export default function RegionFilter() {
  const { selectedRegion, setSelectedRegion } = useFilters();
  
  const regions = useMemo(() => {
      const regionSet = new Set(regionalHotspotData.map(r => r.name));
      return Array.from(regionSet);
  }, []);

  return (
    <Select
      value={selectedRegion || 'all'}
      onValueChange={(value) => setSelectedRegion(value === 'all' ? null : value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Regions" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Regions</SelectItem>
        {regions.map((region) => (
          <SelectItem key={region} value={region}>
            {region}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
