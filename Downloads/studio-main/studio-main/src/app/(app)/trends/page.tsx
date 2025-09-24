
import { PageHeader } from '@/components/page-header';
import { DetailedTrendTable } from '@/components/dashboard/detailed-trend-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TrendsPage() {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 sm:p-6">
        <PageHeader
          title="Trending Keywords"
          description="Explore the latest consumer interest trends across all platforms."
        />
        <div className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Trend Data</CardTitle>
            </CardHeader>
            <CardContent>
              <DetailedTrendTable />
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}
