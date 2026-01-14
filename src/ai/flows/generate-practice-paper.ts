
'use server';

/**
 * @fileOverview An AI agent for generating practice papers with MCQs and long answer questions.
 *
 * - generatePracticePaper - A function that generates a practice paper based on the provided subjects and topics.
 * - GeneratePracticePaperInput - The input type for the generatePracticePaper function.
 * - GeneratePracticePaperOutput - The return type for the generatePracticepaper function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePracticePaperInputSchema = z.object({
  class: z.string().describe('The class for which to generate the paper (e.g., 10).'),
  subject: z.string().describe('The subject for which to generate the practice paper (e.g., Physics, History).'),
  topics: z
    .string()
    .describe(
      'The specific topics or chapters to cover in the practice paper. Separate multiple topics with commas.'
    ),
  marksDistribution: z.string().optional().describe('The mark distribution for each topic, e.g., "Chapter 1: 10 marks, Chapter 2: 15 marks".'),
  numberOfMcq: z
    .number()
    .min(0)
    .max(50)
    .default(10)
    .describe('The number of multiple-choice questions to include.'),
  numberOfShortAnswer: z
    .number()
    .min(0)
    .max(30)
    .default(5)
    .describe('The number of short answer questions to include.'),
  numberOfMediumAnswer: z
    .number()
    .min(0)
    .max(30)
    .default(5)
    .describe('The number of medium answer questions to include.'),
  numberOfLongAnswer: z
    .number()
    .min(0)
    .max(20)
    .default(3)
    .describe('The number of long answer questions to include.'),
    difficulty: z.enum(['Easy', 'Medium', 'Hard']).default('Medium').describe('The difficulty level of the questions.'),
    syllabus: z.enum(['CBSE', 'NCERT', 'Other']).default('NCERT').describe('The syllabus to align with (e.g., CBSE, NCERT).'),
    language: z.string().optional().describe('The language of the paper (e.g., English, Hindi).'),
});
export type GeneratePracticePaperInput = z.infer<typeof GeneratePracticePaperInputSchema>;

const GeneratePracticePaperOutputSchema = z.object({
  mcqQuestions: z.array(z.string()).describe('An array of generated multiple-choice questions. Each question should have 4 options.'),
  shortAnswerQuestions: z
    .array(z.string())
    .describe('An array of generated short answer questions.'),
  mediumAnswerQuestions: z
    .array(z.string())
    .describe('An array of generated medium answer questions.'),
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
  prompt: `You are an expert educator creating a practice paper for students in India. Your task is to generate a set of questions based on the user's specifications.

Class: {{{class}}}
Syllabus: {{{syllabus}}}
Difficulty Level: {{{difficulty}}}
Subject: {{{subject}}}
Topics: {{{topics}}}
{{#if language}}
Language: {{{language}}}
{{/if}}

{{#if marksDistribution}}
The paper should be generated according to the following marks distribution:
Marks Distribution: {{{marksDistribution}}}
Ensure that the questions for each topic approximately add up to the specified marks.
{{/if}}

Please generate:
- {{{numberOfMcq}}} multiple-choice questions (MCQs). Each MCQ must have four distinct options.
- {{{numberOfShortAnswer}}} short answer questions.
- {{{numberOfMediumAnswer}}} medium answer questions.
- {{{numberOfLongAnswer}}} long answer questions.

Ensure the questions are clear, relevant to the topics, and appropriate for the specified class, difficulty and syllabus.

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
