import { AppHeader } from '@/app/(app)/layout';
import AISolutionsClient from './ai-solutions-client';

export const metadata = {
    title: 'AI Tutor | Smart Vidya',
    description: 'Get instant solutions to your questions with our AI Tutor.',
};

export default function AISolutionsPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="AI Tutor" />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <AISolutionsClient />
      </main>
    </div>
  );
}
