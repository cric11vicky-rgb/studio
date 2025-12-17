import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai';
import {defineConfig} from 'genkit';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
