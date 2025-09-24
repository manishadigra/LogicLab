
import { PageHeader } from '@/components/page-header';
import { SentimentAnalyzer } from '@/components/sentiment/sentiment-analysis-form';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

export default function SentimentPage() {
  return (
    <ScrollArea className="flex-1">
      <div className="p-4 sm:p-6">
        <PageHeader
          title="Sentiment Analysis"
          description="Analyze user sentiment from reviews and social media."
        />
        <Card className="mt-6">
          <CardContent className="pt-6">
            <SentimentAnalyzer />
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
