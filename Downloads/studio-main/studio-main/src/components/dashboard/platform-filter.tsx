
'use client';

import { useFilters } from '@/contexts/filter-context';
import { platforms } from '@/app/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function PlatformFilter() {
  const { selectedPlatform, setSelectedPlatform } = useFilters();

  return (
    <Select
      value={selectedPlatform || 'all'}
      onValueChange={(value) => setSelectedPlatform(value === 'all' ? null : value)}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="All Platforms" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Platforms</SelectItem>
        {platforms.map((platform) => (
          <SelectItem key={platform.id} value={platform.name}>
            {platform.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
