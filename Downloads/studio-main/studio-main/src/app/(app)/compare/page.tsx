
import { PageHeader } from '@/components/page-header';
import { ComparisonTable } from '@/components/compare/comparison-table';
import { ProductComparisonTable } from '@/components/compare/product-comparison-table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ComparePage() {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 sm:p-6">
        <PageHeader
          title="Comparison"
          description="Benchmark platforms or product trends against each other."
        />
        <div className="mt-6">
          <Tabs defaultValue="platforms">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="platforms">Platforms</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
            </TabsList>
            <TabsContent value="platforms">
              <ComparisonTable />
            </TabsContent>
            <TabsContent value="products">
              <ProductComparisonTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
}
