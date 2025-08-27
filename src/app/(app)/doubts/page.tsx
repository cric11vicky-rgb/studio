'use client';

import { AppHeader } from '@/app/(app)/layout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageIcon, Mic, Send } from 'lucide-react';
import React from 'react';

const doubts = [
  {
    id: '1',
    question: 'What is the difference between speed and velocity?',
    author: 'Rohan S.',
    timestamp: '3 hours ago',
    answer:
      'Speed is a scalar quantity that refers to "how fast an object is moving." Velocity is a vector quantity that refers to "the rate at which an object changes its position." So, velocity includes direction, while speed does not.',
    answeredBy: 'Physics Expert',
    answerType: 'teacher',
  },
  {
    id: '2',
    question: 'Why do we use "an" before "hour" but "a" before "house"?',
    author: 'Priya K.',
    timestamp: '1 day ago',
    answer:
      'It depends on the sound of the first letter, not the letter itself. "Hour" starts with a vowel sound (ow-er), so we use "an". "House" starts with a consonant sound (h-ouse), so we use "a".',
    answeredBy: 'AI Assistant',
    answerType: 'ai',
  },
  {
    id: '3',
    question: "Can someone explain Pythagoras' theorem with an example?",
    author: 'Amit V.',
    timestamp: '2 days ago',
    answer: null,
  },
];

export default function DoubtsPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Doubt Section" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 space-y-3">
            <h2 className="font-headline text-2xl font-semibold">
              Have a question? Ask the community!
            </h2>
            <p className="text-muted-foreground">
              Post your doubts via text, image, or voice. Get instant help from AI or have it escalated to a teacher.
            </p>
            <div className="relative">
              <Textarea
                placeholder="Type your question here..."
                className="min-h-[100px] resize-none pr-24"
              />
              <div className="absolute bottom-2 right-2 flex gap-1">
                <Button variant="ghost" size="icon" aria-label="Upload image">
                  <ImageIcon />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Record voice">
                  <Mic />
                </Button>
              </div>
            </div>
            <Button>
              <Send className="mr-2" /> Post Question
            </Button>
          </div>

          <h3 className="font-headline text-xl font-semibold mb-4">
            Recent Doubts
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {doubts.map((doubt) => (
              <AccordionItem value={doubt.id} key={doubt.id}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <div className="flex flex-col">
                    <span className="font-semibold">{doubt.question}</span>
                    <span className="text-xs text-muted-foreground">
                      Asked by {doubt.author} • {doubt.timestamp}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2">
                  {doubt.answer ? (
                    <div className="rounded-md border bg-card p-4">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-9 w-9 border">
                           <AvatarImage src={`https://picsum.photos/100?q=${doubt.answeredBy}`} data-ai-hint={doubt.answerType === 'teacher' ? "teacher avatar" : "robot avatar"} />
                          <AvatarFallback>
                            {doubt.answeredBy?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                          <div className="font-semibold flex items-center gap-2">
                            {doubt.answeredBy}
                            {doubt.answerType === 'ai' && (
                               <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary">AI-Generated</span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {doubt.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground italic px-4">
                      No answer yet. Our experts are looking into it!
                    </p>
                  )}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </main>
    </div>
  );
}
