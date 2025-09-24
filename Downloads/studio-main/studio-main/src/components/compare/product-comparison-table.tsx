
'use client';

import { useState, useMemo } from 'react';
import type { TrendData } from '@/app/lib/data';
import { trendData } from '@/app/lib/data';
import { platforms } from '@/app/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { MultiSelect } from '../ui/multi-select';

export function ProductComparisonTable() {
  const allKeywords = useMemo(() => {
    const keywordSet = new Set(trendData.map((d) => d.keyword));
    return Array.from(keywordSet).map(kw => ({ value: kw, label: kw }));
  }, []);

  const [selectedKeywords, setSelectedKeywords] = useState<string[]>(
    allKeywords.slice(0, 5).map(kw => kw.value)
  );

  const comparisonData = useMemo(() => {
    const filteredData = trendData.filter(d => selectedKeywords.includes(d.keyword));
    const pivotData: Record<string, Record<string, number>> = {};

    for (const item of filteredData) {
      if (!pivotData[item.keyword]) {
        pivotData[item.keyword] = { keyword: item.keyword } as any;
      }
      pivotData[item.keyword][item.platform] = item.interestScore;
    }
    
    return Object.values(pivotData);

  }, [selectedKeywords]);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Product/Keyword Selection</CardTitle>
        </CardHeader>
        <CardContent>
          <MultiSelect
            options={allKeywords}
            selected={selectedKeywords}
            onChange={setSelectedKeywords}
            className="w-full"
            placeholder="Select products..."
          />
        </CardContent>
      </Card>

      <Card>
        <ScrollArea>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[150px] font-semibold sticky left-0 bg-card">Product</TableHead>
                {platforms.map((platform) => (
                  <TableHead key={platform.id} className="text-right">
                    {platform.name}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
                {comparisonData.length > 0 ? (
                    comparisonData.map((row: any) => (
                        <TableRow key={row.keyword}>
                        <TableCell className="font-medium text-muted-foreground sticky left-0 bg-card">
                            {row.keyword}
                        </TableCell>
                        {platforms.map((platform) => (
                            <TableCell key={platform.id} className="text-right">
                                {row[platform.name] !== undefined ? `${row[platform.name]}/10` : '-'}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={platforms.length + 1} className="h-24 text-center">
                            No products selected or no data available.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Card>
    </div>
  );
}
