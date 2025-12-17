
'use client';

import React, { useEffect, useActionState } from 'react';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useClass } from '@/context/class-context';

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
  const { selectedClass, availableClasses } = useClass();
  const [currentClass, setCurrentClass] = React.useState(selectedClass);

  useEffect(() => {
    if (selectedClass !== 'All') {
      setCurrentClass(selectedClass);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (state.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: state.error,
      });
    }
  }, [state, toast]);

  const classOptions = availableClasses.filter(c => c !== 'All');

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select name="class" value={currentClass} onValueChange={setCurrentClass} required>
                  <SelectTrigger id="class">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classOptions.map((c) => (
                      <SelectItem key={c} value={c}>
                        Class {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="e.g., Science"
                  required
                />
              </div>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="difficulty">Difficulty</Label>
                    <Select name="difficulty" defaultValue="Medium">
                        <SelectTrigger id="difficulty">
                            <SelectValue placeholder="Select Difficulty" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="syllabus">Syllabus</Label>
                     <Select name="syllabus" defaultValue="NCERT">
                        <SelectTrigger id="syllabus">
                            <SelectValue placeholder="Select Syllabus" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="CBSE">CBSE</SelectItem>
                            <SelectItem value="RBSE">RBSE</SelectItem>
                            <SelectItem value="NCERT">NCERT</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
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
              <Label htmlFor="numberOfShortAnswer">Number of Short Answer Questions: <span id="shortAnswerValue" className="font-bold">5</span></Label>
              <Slider
                id="numberOfShortAnswer"
                name="numberOfShortAnswer"
                defaultValue={[5]}
                max={30}
                step={1}
                onValueChange={(value) => {
                  const shortAnswerValueEl = document.getElementById('shortAnswerValue');
                  if (shortAnswerValueEl) shortAnswerValueEl.innerText = value[0].toString();
                }}
              />
            </div>
             <div className="space-y-4">
              <Label htmlFor="numberOfMediumAnswer">Number of Medium Answer Questions: <span id="mediumAnswerValue" className="font-bold">5</span></Label>
              <Slider
                id="numberOfMediumAnswer"
                name="numberOfMediumAnswer"
                defaultValue={[5]}
                max={30}
                step={1}
                onValueChange={(value) => {
                  const mediumAnswerValueEl = document.getElementById('mediumAnswerValue');
                  if (mediumAnswerValueEl) mediumAnswerValueEl.innerText = value[0].toString();
                }}
              />
            </div>
            <div className="space-y-4">
              <Label htmlFor="numberOfLongAnswer">Number of Long Answer Questions: <span id="longAnswerValue" className="font-bold">3</span></Label>
              <Slider
                id="numberOfLongAnswer"
                name="numberOfLongAnswer"
                defaultValue={[3]}
                max={20}
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
            {useFormStatus().pending ? (
               <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full p-8">
                <Loader2 className="h-12 w-12 mb-4 animate-spin" />
                <p className="font-semibold">Our AI is preparing your paper...</p>
                <p>Please wait a moment.</p>
              </div>
            ) : !state.data ? (
              <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full p-8">
                <Sparkles className="h-12 w-12 mb-4" />
                <p>Your practice paper is waiting to be created!</p>
              </div>
            ) : (
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
                    Short Answer Questions
                  </h3>
                  {state.data.shortAnswerQuestions?.length > 0 ? (
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      {state.data.shortAnswerQuestions.map((q, i) => <li key={`short-${i}`}>{q}</li>)}
                    </ol>
                  ) : (
                    <p className="text-sm text-muted-foreground">No short answer questions generated.</p>
                  )}
                </div>
                 <div>
                  <h3 className="font-headline font-semibold text-lg mb-2">
                    Medium Answer Questions
                  </h3>
                  {state.data.mediumAnswerQuestions?.length > 0 ? (
                    <ol className="list-decimal list-inside space-y-2 text-sm">
                      {state.data.mediumAnswerQuestions.map((q, i) => <li key={`medium-${i}`}>{q}</li>)}
                    </ol>
                  ) : (
                    <p className="text-sm text-muted-foreground">No medium answer questions generated.</p>
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
