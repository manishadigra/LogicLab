
'use server';

import {
  summarizeFinancialReport,
  type SummarizeFinancialReportOutput,
} from '@/ai/flows/summarize-financial-report';
import { z } from 'zod';

const reportSchema = z.object({
  platformName: z.string({ required_error: 'Please select a platform.' }),
  reportText: z.string().min(100, 'Please enter at least 100 characters of the report.'),
});

export type ReportGenerationState = {
  message: string;
  status: 'idle' | 'success' | 'error';
  result?: SummarizeFinancialReportOutput;
  errors?: {
    platformName?: string[];
    reportText?: string[];
  };
  input?: {
    platformName: string;
    reportText: string;
  };
};

export async function handleReportGeneration(
  prevState: ReportGenerationState,
  formData: FormData
): Promise<ReportGenerationState> {
  const validatedFields = reportSchema.safeParse({
    platformName: formData.get('platformName'),
    reportText: formData.get('reportText'),
  });

  const input = {
    platformName: formData.get('platformName') as string,
    reportText: formData.get('reportText') as string,
  };

  if (!validatedFields.success) {
    return {
      status: 'error',
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the fields.',
      input,
    };
  }

  try {
    const result = await summarizeFinancialReport(validatedFields.data);
    return { 
        message: 'Report generation successful.', 
        status: 'success',
        result,
        input,
    };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { 
        message: `Analysis failed: ${errorMessage}`,
        status: 'error',
        input,
     };
  }
}
