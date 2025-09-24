
'use server';

/**
 * @fileOverview This file defines a Genkit flow for analyzing user sentiment
 * from online reviews and social media for different online service platforms.
 *
 * - analyzePlatformSentiment - Analyzes user sentiment for a given platform.
 * - AnalyzePlatformSentimentInput - The input type for the analyzePlatformSentiment function.
 * - AnalyzePlatformSentimentOutput - The return type for the analyzePlatformSentiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzePlatformSentimentInputSchema = z.object({
  platformName: z.string().describe('The name of the online service platform.'),
  reviewText: z.string().describe('Online reviews and social media text related to the platform.'),
});
export type AnalyzePlatformSentimentInput = z.infer<
  typeof AnalyzePlatformSentimentInputSchema
>;

const AnalyzePlatformSentimentOutputSchema = z.object({
  sentimentScore: z
    .number()
    .describe(
      'A numerical score representing the sentiment, where -1 is very negative and 1 is very positive.'
    ),
  sentimentLabel: z
    .string()
    .describe(
      'A descriptive label of the sentiment, such as "positive", "negative", or "neutral".'
    ),
  summary: z
    .string()
    .describe('A brief summary of the sentiment analysis results.'),
});
export type AnalyzePlatformSentimentOutput = z.infer<
  typeof AnalyzePlatformSentimentOutputSchema
>;

export async function analyzePlatformSentiment(
  input: AnalyzePlatformSentimentInput
): Promise<AnalyzePlatformSentimentOutput> {
  return analyzePlatformSentimentFlow(input);
}

const analyzePlatformSentimentPrompt = ai.definePrompt({
  name: 'analyzePlatformSentimentPrompt',
  input: {schema: AnalyzePlatformSentimentInputSchema},
  output: {schema: AnalyzePlatformSentimentOutputSchema},
  prompt: `You are an AI sentiment analyst tasked with analyzing user sentiment for online service platforms.

  Analyze the following user reviews and social media text for {{platformName}}:

  {{reviewText}}

  Provide a sentiment score between -1 and 1, a sentiment label (positive, negative, or neutral), and a brief summary of your analysis.

  Ensure that your response follows the output schema.
  `,
});

const analyzePlatformSentimentFlow = ai.defineFlow(
  {
    name: 'analyzePlatformSentimentFlow',
    inputSchema: AnalyzePlatformSentimentInputSchema,
    outputSchema: AnalyzePlatformSentimentOutputSchema,
  },
  async input => {
    const {output} = await analyzePlatformSentimentPrompt(input);
    return output!;
  }
);
