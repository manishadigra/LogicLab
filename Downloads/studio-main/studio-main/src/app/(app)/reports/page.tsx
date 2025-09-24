
import { PageHeader } from '@/components/page-header';
import { ReportGenerator } from '@/components/reports/report-generator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

export default function ReportsPage() {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 sm:p-6">
        <PageHeader
          title="Financial Reports"
          description="Generate a detailed financial report for a selected platform."
        />
        <Card className="mt-6">
          <CardContent className="pt-6">
            <ReportGenerator />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
