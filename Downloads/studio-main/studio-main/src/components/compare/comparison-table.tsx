'use client';

import { useState } from 'react';
import type { Platform } from '@/app/lib/data';
import { platforms as allPlatforms } from '@/app/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { formatCurrency, formatNumber, formatPercentage } from '@/lib/utils';
import { PlatformIcon } from '@/components/icons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

export function ComparisonTable() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(
    allPlatforms.slice(0, 4).map((p) => p.id)
  );

  const handlePlatformSelect = (platformId: string, checked: boolean) => {
    setSelectedPlatforms((prev) =>
      checked
        ? [...prev, platformId]
        : prev.filter((id) => id !== platformId)
    );
  };

  const displayedPlatforms = allPlatforms.filter((p) =>
    selectedPlatforms.includes(p.id)
  );

  const metrics = [
    { label: 'Category', render: (p: Platform) => p.category },
    { label: 'Market Cap', render: (p: Platform) => formatCurrency(p.marketCap) },
    { label: 'Revenue', render: (p: Platform) => formatCurrency(p.revenue) },
    { label: 'YoY Growth', render: (p: Platform) => formatPercentage(p.yoyGrowth) },
    { label: 'User Base', render: (p: Platform) => formatNumber(p.userBase) },
    { label: 'Sentiment', render: (p: Platform) => p.sentiment.toFixed(2) },
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
            <CardTitle>Platform Selection</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
            {allPlatforms.map((platform) => (
                <div key={platform.id} className="flex items-center space-x-2">
                <Checkbox
                    id={platform.id}
                    checked={selectedPlatforms.includes(platform.id)}
                    onCheckedChange={(checked) => handlePlatformSelect(platform.id, !!checked)}
                />
                <label
                    htmlFor={platform.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    {platform.name}
                </label>
                </div>
            ))}
            </div>
        </CardContent>
      </Card>
      
      <Card>
        <ScrollArea>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[150px] font-semibold sticky left-0 bg-card">Metric</TableHead>
                {displayedPlatforms.map((platform) => (
                    <TableHead key={platform.id}>
                    <div className="flex items-center gap-2">
                        <PlatformIcon category={platform.category} className="h-5 w-5" />
                        <span className="font-semibold">{platform.name}</span>
                    </div>
                    </TableHead>
                ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {metrics.map((metric) => (
                <TableRow key={metric.label}>
                    <TableCell className="font-medium text-muted-foreground sticky left-0 bg-card">
                    {metric.label}
                    </TableCell>
                    {displayedPlatforms.map((platform) => (
                    <TableCell key={platform.id}>
                        {metric.render(platform)}
                    </TableCell>
                    ))}
                </TableRow>
                ))}
            </TableBody>
            </Table>
            <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
}
