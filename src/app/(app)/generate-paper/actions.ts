'use server';

import { generatePracticePaper } from '@/ai/flows/generate-practice-paper';
import { z } from 'zod';

const paperSchema = z.object({
  subject: z.string().min(1, 'Subject is required.'),
  topics: z.string().min(1, 'Topics are required.'),
  numberOfMcq: z.number().min(0).max(50),
  numberOfLongAnswer: z.number().min(0).max(10),
});

type PaperResult = {
  success: boolean;
  data?: {
    mcqQuestions: string[];
    longAnswerQuestions: string[];
  };
  error?: string;
};

export async function createPracticePaper(
  prevState: any,
  formData: FormData
): Promise<PaperResult> {
  const validatedFields = paperSchema.safeParse({
    subject: formData.get('subject'),
    topics: formData.get('topics'),
    numberOfMcq: Number(formData.get('numberOfMcq')),
    numberOfLongAnswer: Number(formData.get('numberOfLongAnswer')),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.',
    };
  }

  try {
    const result = await generatePracticePaper(validatedFields.data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Failed to generate paper. Please try again later.',
    };
  }
}
