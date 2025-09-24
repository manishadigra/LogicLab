
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartConfig,
} from '@/components/ui/chart';
import { regionalHotspotData } from '@/app/lib/data';
import { useMemo } from 'react';
import { useFilters } from '@/contexts/filter-context';

const chartConfig = {
  value: {
    label: 'Interest',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export default function RegionalHotspotChart() {
    const { selectedRegion } = useFilters();
  const chartData = useMemo(() => {
    const data = [...regionalHotspotData].sort((a,b) => a.value - b.value);
    if(selectedRegion) {
        return data.map(d => ({...d, value: d.name === selectedRegion ? 10 : d.value}))
    }
    return data;
  }, [selectedRegion]);
  
  return (
    <ChartContainer config={chartConfig} className="h-48 w-full">
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ left: 10, right: 10, top: 10, bottom: 10 }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          width={80}
          className="text-xs"
        />
        <XAxis type="number" hide />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar dataKey="value" fill="var(--color-value)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
