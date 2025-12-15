
'use client';

import { useEffect, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { createPracticePaper } from './actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const initialState = {
  success: false,
  data: undefined,
  error: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generate Paper
        </>
      )}
    </Button>
  );
}

export default function GeneratePaperClient() {
  const [state, formAction] = useActionState(createPracticePaper, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Create Your Test</CardTitle>
          <CardDescription>
            Select a subject and topics to generate a personalized practice paper.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                placeholder="e.g., Science"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="topics">Topics</Label>
              <Input
                id="topics"
                name="topics"
                placeholder="e.g., Light, Photosynthesis, Human Body"
                required
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple topics with a comma.
              </p>
            </div>
            <div className="space-y-4">
              <Label htmlFor="numberOfMcq">Number of MCQs: <span id="mcqValue" className="font-bold">10</span></Label>
              <Slider
                id="numberOfMcq"
                name="numberOfMcq"
                defaultValue={[10]}
                max={50}
                step={1}
                onValueChange={(value) => {
                  const mcqValueEl = document.getElementById('mcqValue');
                  if (mcqValueEl) mcqValueEl.innerText = value[0].toString();
                }}
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="numberOfLongAnswer">Number of Long Answer Questions: <span id="longAnswerValue" className="font-bold">3</span></Label>
              <Slider
                id="numberOfLongAnswer"
                name="numberOfLongAnswer"
                defaultValue={[3]}
                max={10}
                step={1}
                onValueChange={(value) => {
                  const longAnswerValueEl = document.getElementById('longAnswerValue');
                  if (longAnswerValueEl) longAnswerValueEl.innerText = value[0].toString();
                }}
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-1">
        <Card className="sticky top-4">
          <CardHeader>
            <CardTitle className="font-headline">Generated Paper</CardTitle>
            <CardDescription>
              Your questions will appear here once generated.
            </CardDescription>
          </CardHeader>
          <CardContent className="min-h-[300px] max-h-[70vh] overflow-y-auto">
            {!state.data && (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full p-8">
                <Sparkles className="h-12 w-12 mb-4" />
                <p>Your practice paper is waiting to be created!</p>
              </div>
            )}
            {state.data && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-2">
                    Multiple Choice Questions
                  </h3>
                  {state.data.mcqQuestions.length > 0 ? (
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      {state.data.mcqQuestions.map((q, i) => <li key={`mcq-${i}`}>{q}</li>)}
                    </ol>
                  ) : (
                    <p className="text-sm text-muted-foreground">No MCQs generated.</p>
                  )}
                </div>
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-2">
                    Long Answer Questions
                  </h3>
                   {state.data.longAnswerQuestions.length > 0 ? (
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      {state.data.longAnswerQuestions.map((q, i) => <li key={`long-${i}`}>{q}</li>)}
                    </ol>
                  ) : (
                     <p className="text-sm text-muted-foreground">No long answer questions generated.</p>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
