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
  subject: z.string().describe('The subject for which to generate the practice paper.'),
  topics: z
    .string()
    .describe(
      'The topics to include in the practice paper.  Separate multiple topics with commas.'
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
});
export type GeneratePracticePaperInput = z.infer<typeof GeneratePracticePaperInputSchema>;

const GeneratePracticePaperOutputSchema = z.object({
  mcqQuestions: z.array(z.string()).describe('The generated multiple-choice questions.'),
  longAnswerQuestions: z
    .array(z.string())
    .describe('The generated long answer questions.'),
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
  prompt: `You are an expert educator creating a practice paper for Class 3-10 students.

The subject is: {{{subject}}}

The topics to cover are: {{{topics}}}

Generate {{{numberOfMcq}}} multiple-choice questions and {{{numberOfLongAnswer}}} long answer questions covering the specified topics.  Each MCQ question should have 4 possible answers.

MCQ Questions:
{{#each mcqQuestions}}- {{this}}
{{/each}}

Long Answer Questions:
{{#each longAnswerQuestions}}- {{this}}
{{/each}}`,
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
