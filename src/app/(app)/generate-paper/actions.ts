'use server';

import { generatePracticePaper } from '@/ai/flows/generate-practice-paper';
import { z } from 'zod';

const paperSchema = z.object({
  class: z.string().min(1, 'Class is required.'),
  subject: z.string().min(1, 'Subject is required.'),
  topics: z.string().min(1, 'Topics are required.'),
  numberOfMcq: z.number().min(0).max(50),
  numberOfShortAnswer: z.number().min(0).max(30),
  numberOfMediumAnswer: z.number().min(0).max(30),
  numberOfLongAnswer: z.number().min(0).max(20),
  difficulty: z.enum(['Easy', 'Medium', 'Hard']),
  syllabus: z.enum(['CBSE', 'RBSE', 'NCERT', 'Other']),
});

type PaperResult = {
  success: boolean;
  data?: {
    mcqQuestions: string[];
    shortAnswerQuestions: string[];
    mediumAnswerQuestions: string[];
    longAnswerQuestions: string[];
  };
  error?: string;
};

export async function createPracticePaper(
  prevState: any,
  formData: FormData
): Promise<PaperResult> {
  const validatedFields = paperSchema.safeParse({
    class: formData.get('class'),
    subject: formData.get('subject'),
    topics: formData.get('topics'),
    numberOfMcq: Number(formData.get('numberOfMcq')),
    numberOfShortAnswer: Number(formData.get('numberOfShortAnswer')),
    numberOfMediumAnswer: Number(formData.get('numberOfMediumAnswer')),
    numberOfLongAnswer: Number(formData.get('numberOfLongAnswer')),
    difficulty: formData.get('difficulty'),
    syllabus: formData.get('syllabus'),
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
