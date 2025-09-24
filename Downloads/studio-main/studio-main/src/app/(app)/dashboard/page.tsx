
import { PageHeader } from '@/components/page-header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DetailedTrendTable } from '@/components/dashboard/detailed-trend-table';
import PlatformFilter from '@/components/dashboard/platform-filter';
import RegionalHotspotChart from '@/components/dashboard/regional-hotspot-chart';
import { ComparativeInterestChartContainer } from '@/components/dashboard/comparative-interest-chart-container';
import RegionFilter from '@/components/dashboard/region-filter';

export default function DashboardPage() {
  return (
    <ScrollArea className="flex-1">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <PageHeader title="Dashboard">
          <div className="flex items-center space-x-2">
            <PlatformFilter />
            <RegionFilter />
          </div>
        </PageHeader>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Comparative Interest</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ComparativeInterestChartContainer />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Regional Hotspots</CardTitle>
            </CardHeader>
            <CardContent>
              <RegionalHotspotChart />
            </CardContent>
          </Card>
        </div>
        <div>
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
