
'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import type { Platform } from '@/app/lib/data';
import { handleSentimentAnalysis, type SentimentAnalysisState } from '@/app/(app)/sentiment/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { platforms } from '@/app/lib/data';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Analyzing...
        </>
      ) : (
        <>
          <Wand2 className="mr-2 h-4 w-4" />
          Analyze Sentiment
        </>
      )}
    </Button>
  );
}

export function SentimentAnalyzer() {
  const initialState: SentimentAnalysisState = {};
  const [state, dispatch] = useActionState(handleSentimentAnalysis, initialState);

  const getSentimentColor = (score: number) => {
    if (score > 0.5) return 'text-green-500';
    if (score > 0.1) return 'text-green-400';
    if (score > -0.1) return 'text-yellow-400';
    if (score > -0.5) return 'text-orange-400';
    return 'text-red-500';
  };

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form action={dispatch}>
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Analyzer</CardTitle>
            <CardDescription>
              Analyze user sentiment from reviews and social media.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platformName">Platform</Label>
              <Select name="platformName" defaultValue={state.input?.platformName}>
                <SelectTrigger id="platformName">
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform.id} value={platform.name}>
                      {platform.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {state.errors?.platformName && (
                <p className="text-sm text-destructive">{state.errors.platformName[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewText">Review Text</Label>
              <Textarea
                id="reviewText"
                name="reviewText"
                placeholder="e.g., 'This app is amazing and so easy to use!'"
                rows={8}
                defaultValue={state.input?.reviewText}
                className="text-xs"
              />
              {state.errors?.reviewText && (
                <p className="text-sm text-destructive">{state.errors.reviewText[0]}</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </Card>
      </form>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Results</CardTitle>
          <CardDescription>
            The generated sentiment analysis will appear here.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.message && !state.result && (
            <Alert variant={state.errors ? 'destructive' : 'default'}>
              <AlertTitle>{state.errors ? 'Error' : 'Status'}</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}

          {!state.result && !state.message && (
             <div className="flex items-center justify-center h-full min-h-[300px] border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Waiting for input...</p>
             </div>
          )}

          {state.result && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-muted-foreground">Sentiment Score</p>
                  <p className={`text-4xl font-bold ${getSentimentColor(state.result.sentimentScore)}`}>
                    {state.result.sentimentScore.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Sentiment Label</p>
                  <p className="text-4xl font-bold capitalize">
                    {state.result.sentimentLabel}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Summary</h3>
                <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">
                  {state.result.summary}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
