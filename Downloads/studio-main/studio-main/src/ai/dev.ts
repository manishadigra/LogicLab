
'use server';
import {config} from 'dotenv';
config();

import '@/ai/flows/analyze-platform-sentiment.ts';
import '@/ai/flows/summarize-financial-report.ts';
