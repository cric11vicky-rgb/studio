'use server';

/**
 * @fileOverview An AI agent for generating practice papers with MCQs and long answer questions.
 *
 * - generatePracticePaper - A function that generates a practice paper based on the provided subjects and topics.
 * - GeneratePracticePaperInput - The input type for the generatePracticePaper function.
 * - GeneratePracticePaperOutput - The return type for the generatePracticePaper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticePaperInputSchema = z.object({
  subject: z.string().describe('The subject for which to generate the practice paper (e.g., Physics, History).'),
  topics: z
    .string()
    .describe(
      'The specific topics or chapters to cover in the practice paper. Separate multiple topics with commas.'
    ),
  numberOfMcq: z
    .number()
    .min(0)
    .max(50)
    .default(10)
    .describe('The number of multiple-choice questions to include.'),
  numberOfLongAnswer: z
    .number()
    .min(0)
    .max(10)
    .default(3)
    .describe('The number of long answer questions to include.'),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Medium').describe('The difficulty level of the questions.'),
    syllabus: z.enum(['CBSE', 'RBSE', 'NCERT', 'Other']).default('NCERT').describe('The syllabus to align with (e.g., CBSE, RBSE, NCERT).'),
});
export type GeneratePracticePaperInput = z.infer<typeof GeneratePracticePaperInputSchema>;

const GeneratePracticePaperOutputSchema = z.object({
  mcqQuestions: z.array(z.string()).describe('An array of generated multiple-choice questions. Each question should have 4 options.'),
  longAnswerQuestions: z
    .array(z.string())
    .describe('An array of generated long answer questions.'),
});
export type GeneratePracticePaperOutput = z.infer<typeof GeneratePracticePaperOutputSchema>;

export async function generatePracticePaper(
  input: GeneratePracticePaperInput
): Promise<GeneratePracticePaperOutput> {
  return generatePracticePaperFlow(input);
}

const generatePracticePaperPrompt = ai.definePrompt({
  name: 'generatePracticePaperPrompt',
  input: {schema: GeneratePracticePaperInputSchema},
  output: {schema: GeneratePracticePaperOutputSchema},
  prompt: `You are an expert educator creating a practice paper for Class 3-10 students in India. Your task is to generate a set of questions based on the user's specifications.

Syllabus: {{{syllabus}}}
Difficulty Level: {{{difficulty}}}
Subject: {{{subject}}}
Topics: {{{topics}}}

Please generate {{{numberOfMcq}}} multiple-choice questions (MCQs) and {{{numberOfLongAnswer}}} long answer questions.

Ensure the questions are clear, relevant to the topics, and appropriate for the specified difficulty and syllabus. Each MCQ must have four distinct options.

Format the output as specified in the output schema.`,
});

const generatePracticePaperFlow = ai.defineFlow(
  {
    name: 'generatePracticePaperFlow',
    inputSchema: GeneratePracticePaperInputSchema,
    outputSchema: GeneratePracticePaperOutputSchema,
  },
  async input => {
    const {output} = await generatePracticePaperPrompt(input);
    return output!;
  }
);
