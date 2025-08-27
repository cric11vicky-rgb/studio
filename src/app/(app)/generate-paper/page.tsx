import { AppHeader } from '@/app/(app)/layout';
import GeneratePaperClient from './generate-paper-client';

export default function GeneratePaperPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="AI Paper Generator" />
      <main className="flex-1 p-4 md:p-8">
        <GeneratePaperClient />
      </main>
    </div>
  );
}
