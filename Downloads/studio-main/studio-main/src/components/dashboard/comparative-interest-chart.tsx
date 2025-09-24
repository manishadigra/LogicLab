
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
  ChartConfig,
} from '@/components/ui/chart';
import type { TrendData } from '@/app/lib/data';

const chartConfig = {
  interestScore: {
    label: 'Interest Score',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

type ComparativeInterestChartProps = {
  data: TrendData[];
};

export default function ComparativeInterestChart({ data }: ComparativeInterestChartProps) {
  if (data.length < 2) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground text-center">
          Select 2 or more keywords from the table below to compare their interest scores.
        </p>
      </div>
    );
  }

  return (
    <ChartContainer config={chartConfig} className="h-48 w-full">
      <BarChart
        data={data}
        layout="horizontal"
        margin={{ left: 10, right: 10, top: 10, bottom: 20 }}
      >
        <CartesianGrid vertical={false} />
        <YAxis type="number" dataKey="interestScore" domain={[0, 10]} hide/>
        <XAxis
          dataKey="keyword"
          type="category"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="text-xs"
          interval={0}
          angle={-45}
          textAnchor="end"
        />
        <Tooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <Bar dataKey="interestScore" name="Interest Score" fill="var(--color-interestScore)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
