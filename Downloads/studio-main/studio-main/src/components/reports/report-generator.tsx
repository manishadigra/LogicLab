
'use client';

import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import { handleReportGeneration, type ReportGenerationState } from './actions';
import { platforms } from '@/app/lib/data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { FileText, Loader2, Wand2, Lightbulb, AlertTriangle, TrendingUp } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <FileText className="mr-2 h-4 w-4"/>
          Generate Financial Summary
        </>
      )}
    </Button>
  );
}

export function ReportGenerator() {
  const initialState: ReportGenerationState = { message: '', status: 'idle' };
  const [state, dispatch] = useFormState(handleReportGeneration, initialState);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <form action={dispatch}>
        <Card>
          <CardHeader>
            <CardTitle>Financial Report Summarizer</CardTitle>
            <CardDescription>Generate an AI-powered summary of a financial report.</CardDescription>
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
              <Label htmlFor="reportText">Paste Financial Report Text</Label>
               <Textarea
                id="reportText"
                name="reportText"
                placeholder="Paste the full text of the financial report here..."
                className="min-h-[200px] text-xs"
                defaultValue={state.input?.reportText}
              />
               {state.errors?.reportText && (
                <p className="text-sm text-destructive">{state.errors.reportText[0]}</p>
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
            <CardTitle>AI Analysis</CardTitle>
            <CardDescription>The generated report summary will appear below.</CardDescription>
        </CardHeader>
        <CardContent>
            {state.status === 'idle' && (
                <div className="flex items-center justify-center h-full min-h-[300px] border-2 border-dashed rounded-lg">
                    <p className="text-muted-foreground">Report will be generated here.</p>
                </div>
            )}
             {state.status === 'error' && (
                <Alert variant="destructive">
                    <AlertTitle>Error</AlertTitle>
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
             )}
            {state.status === 'success' && state.result && (
                <div className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">Summary</h3>
                        <p className="text-sm text-muted-foreground bg-secondary p-3 rounded-md">
                            {state.result.summary}
                        </p>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><Lightbulb className="w-4 h-4 text-primary" /> Key Insights</h3>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                           {state.result.keyInsights.split('\n').map((item, i) => item.trim() && <li key={i}>{item.replace('-', '').trim()}</li>)}
                        </ul>
                    </div>
                     <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><AlertTriangle className="w-4 h-4 text-destructive" /> Risks</h3>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                           {state.result.risks.split('\n').map((item, i) => item.trim() && <li key={i}>{item.replace('-', '').trim()}</li>)}
                        </ul>
                    </div>
                    <div className="space-y-2">
                        <h3 className="font-semibold flex items-center gap-2"><TrendingUp className="w-4 h-4 text-green-500" /> Opportunities</h3>
                        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                          {state.result.opportunities.split('\n').map((item, i) => item.trim() && <li key={i}>{item.replace('-', '').trim()}</li>)}
                        </ul>
                    </div>
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
