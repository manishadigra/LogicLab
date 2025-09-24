
'use client';

import { useMemo } from 'react';
import type { TrendData } from '@/app/lib/data';
import { trendData as allTrendData } from '@/app/lib/data';
import { useFilters } from '@/contexts/filter-context';
import ComparativeInterestChart from './comparative-interest-chart';

export function ComparativeInterestChartContainer() {
  const { selectedCategory, selectedPlatform } = useFilters();

  const data = useMemo(() => {
    let filteredData = allTrendData;
    if (selectedCategory) {
      filteredData = filteredData.filter(d => d.category === selectedCategory);
    }
    if (selectedPlatform) {
      filteredData = filteredData.filter(d => d.platform === selectedPlatform);
    }

    const groupedData = filteredData.reduce((acc, item) => {
      if (!acc[item.keyword]) {
        acc[item.keyword] = {
          keyword: item.keyword,
          interestScore: 0,
          count: 0,
        };
      }
      acc[item.keyword].interestScore += item.interestScore;
      acc[item.keyword].count++;
      return acc;
    }, {} as Record<string, { keyword: string; interestScore: number; count: number }>);

    const averagedData = Object.values(groupedData).map(item => ({
      ...item,
      interestScore: Math.round(item.interestScore / item.count),
    }));

    return averagedData
      .sort((a, b) => b.interestScore - a.interestScore)
      .slice(0, 10) as TrendData[];
  }, [selectedCategory, selectedPlatform]);

  return <ComparativeInterestChart data={data} />;
}
