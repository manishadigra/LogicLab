'use server';

import {
  analyzePlatformSentiment,
  type AnalyzePlatformSentimentOutput,
} from '@/ai/flows/analyze-platform-sentiment';
import { z } from 'zod';

const sentimentSchema = z.object({
  platformName: z.string({ required_error: 'Please select a platform.' }),
  reviewText: z.string().min(20, 'Please enter at least 20 characters.'),
});

export type SentimentAnalysisState = {
  message?: string;
  result?: AnalyzePlatformSentimentOutput;
  errors?: {
    platformName?: string[];
    reviewText?: string[];
  };
  input?: {
    platformName: string;
    reviewText: string;
  };
};

export async function handleSentimentAnalysis(
  prevState: SentimentAnalysisState,
  formData: FormData
): Promise<SentimentAnalysisState> {
  const validatedFields = sentimentSchema.safeParse({
    platformName: formData.get('platformName'),
    reviewText: formData.get('reviewText'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Validation failed. Please check the fields.',
      input: {
        platformName: formData.get('platformName') as string,
        reviewText: formData.get('reviewText') as string,
      }
    };
  }

  try {
    const result = await analyzePlatformSentiment(validatedFields.data);
    return { message: 'Analysis successful.', result, input: validatedFields.data };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred.';
    return { message: `Analysis failed: ${errorMessage}`, input: validatedFields.data };
  }
}
