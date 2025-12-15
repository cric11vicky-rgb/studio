'use server';

import { solveQuestion } from '@/ai/flows/solve-question-flow';
import { z } from 'zod';

const solutionSchema = z.object({
  question: z.string().optional(),
  imageDataUri: z.string().optional(),
});

type SolutionResult = {
  success: boolean;
  data?: {
    solution: string;
  };
  error?: string;
};

export async function getAIUpdate(
  prevState: any,
  formData: FormData
): Promise<SolutionResult> {
  const validatedFields = solutionSchema.safeParse({
    question: formData.get('question'),
    imageDataUri: formData.get('imageDataUri'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: 'Invalid form data. Please check your inputs.',
    };
  }
  
  if (!validatedFields.data.question && !validatedFields.data.imageDataUri) {
    return {
      success: false,
      error: 'Please enter a question or upload an image.',
    };
  }

  try {
    const result = await solveQuestion(validatedFields.data);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
    return {
      success: false,
      error: `Failed to get solution: ${errorMessage}`,
    };
  }
}
