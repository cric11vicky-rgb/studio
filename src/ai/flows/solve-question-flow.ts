'use server';

/**
 * @fileOverview An AI agent for solving student questions from text or images.
 *
 * - solveQuestion - A function that solves a question provided as text and/or an image.
 * - SolveQuestionInput - The input type for the solveQuestion function.
 * - SolveQuestionOutput - The return type for the solveQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolveQuestionInputSchema = z.object({
  question: z.string().optional().describe('The text of the question to be solved.'),
  imageDataUri: z.string().optional().describe(
    "An image containing the question, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
  ),
});
export type SolveQuestionInput = z.infer<typeof SolveQuestionInputSchema>;

const SolveQuestionOutputSchema = z.object({
  solution: z.string().describe('The detailed, step-by-step solution to the question.'),
});
export type SolveQuestionOutput = z.infer<typeof SolveQuestionOutputSchema>;

export async function solveQuestion(
  input: SolveQuestionInput
): Promise<SolveQuestionOutput> {
  return solveQuestionFlow(input);
}

const solveQuestionPrompt = ai.definePrompt({
  name: 'solveQuestionPrompt',
  input: {schema: SolveQuestionInputSchema},
  output: {schema: SolveQuestionOutputSchema},
  prompt: `You are an expert teacher AI for students from Class 3 to 12 in India. Your goal is to provide a clear, step-by-step solution to the user's question. The question may be provided as text, an image, or both.

If the question is unclear, ask for clarification. Otherwise, provide a detailed, easy-to-understand solution.

Question Text: {{{question}}}
{{#if imageDataUri}}
Question Image: {{media url=imageDataUri}}
{{/if}}

Please format the solution clearly. Use markdown for formatting if needed (e.g., for lists, bold text, etc.).`,
});

const solveQuestionFlow = ai.defineFlow(
  {
    name: 'solveQuestionFlow',
    inputSchema: SolveQuestionInputSchema,
    outputSchema: SolveQuestionOutputSchema,
  },
  async input => {
    if (!input.question && !input.imageDataUri) {
        throw new Error('You must provide a question in text or image format.');
    }
    const {output} = await solveQuestionPrompt(input);
    return output!;
  }
);
