
'use server';
/**
 * @fileOverview This file defines a Genkit flow for summarizing financial reports of online service platforms.
 *
 * The flow takes a financial report as input and returns a summarized report highlighting key insights, risks, and opportunities.
 * - summarizeFinancialReport - The main function to trigger the financial report summarization.
 * - SummarizeFinancialReportInput - The input type for the summarizeFinancialReport function.
 * - SummarizeFinancialReportOutput - The output type for the summarizeFinancialReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeFinancialReportInputSchema = z.object({
  reportText: z
    .string()
    .describe('The detailed financial report data as a string.'),
  platformName: z
    .string()
    .describe('The name of the platform the report is for.'),
});
export type SummarizeFinancialReportInput = z.infer<
  typeof SummarizeFinancialReportInputSchema
>;

const SummarizeFinancialReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the financial report, including key metrics and trends.'),
  keyInsights: z.string().describe('Bulleted list of key insights from the report.'),
  risks: z.string().describe('Bulleted list of potential risks identified in the report.'),
  opportunities: z
    .string()
    .describe('Bulleted list of potential opportunities identified in the report.'),
});
export type SummarizeFinancialReportOutput = z.infer<
  typeof SummarizeFinancialReportOutputSchema
>;

export async function summarizeFinancialReport(
  input: SummarizeFinancialReportInput
): Promise<SummarizeFinancialReportOutput> {
  return summarizeFinancialReportFlow(input);
}

const summarizeFinancialReportPrompt = ai.definePrompt({
  name: 'summarizeFinancialReportPrompt',
  input: {schema: SummarizeFinancialReportInputSchema},
  output: {schema: SummarizeFinancialReportOutputSchema},
  prompt: `You are an expert financial analyst. Your task is to summarize a financial report for the platform: {{platformName}}.

  Based on the financial report data provided, generate a concise summary, and then provide bulleted lists for key insights, potential risks, and potential opportunities.

  Financial Report Data:
  {{reportText}}
`,
});

const summarizeFinancialReportFlow = ai.defineFlow(
  {
    name: 'summarizeFinancialReportFlow',
    inputSchema: SummarizeFinancialReportInputSchema,
    outputSchema: SummarizeFinancialReportOutputSchema,
  },
  async input => {
    const {output} = await summarizeFinancialReportPrompt(input);
    return output!;
  }
);
