
import { ArrowRight, BookCheck } from 'lucide-react';
import { AppHeader } from '@/app/(app)/layout';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const solutions = [
    {
    title: 'Chapter 1: Where to Look From',
    subject: 'Mathematics',
    class: '3',
    exercises: 3,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Poonam\'s Day Out',
    subject: 'Environment Studies',
    class: '3',
    exercises: 4,
    type: 'NCERT'
  },
    {
    title: 'Chapter 1: Building with Bricks',
    subject: 'Mathematics',
    class: '4',
    exercises: 5,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Super Senses',
    subject: 'Environment Studies',
    class: '5',
    exercises: 4,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Knowing Our Numbers',
    subject: 'Mathematics',
    class: '6',
    exercises: 3,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Integers',
    subject: 'Mathematics',
    class: '7',
    exercises: 4,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Rational Numbers',
    subject: 'Mathematics',
    class: '8',
    exercises: 4,
    type: 'Sample Paper'
  },
  {
    title: 'Chapter 1: Number Systems',
    subject: 'Mathematics',
    class: '9',
    exercises: 6,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Real Numbers',
    subject: 'Mathematics',
    class: '10',
    exercises: 4,
    type: 'NCERT'
  },
  {
    title: 'Chapter 2: Microorganisms',
    subject: 'Science',
    class: '8',
    exercises: 5,
    type: 'NCERT'
  },
  {
    title: 'Poem 1: The Ant and the Cricket',
    subject: 'English',
    class: '8',
    exercises: 2,
    type: 'NCERT'
  },
  {
    title: 'Indian States and Capitals',
    subject: 'General Knowledge',
    class: 'All',
    exercises: 1,
    type: 'Worksheet'
  },
];

export default function SolutionsPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Textbook Solutions" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">Find Textbook Solutions</CardTitle>
                <CardDescription>
                Get step-by-step solutions for textbook questions, including NCERT and sample papers, to help you understand concepts better and prepare for exams.
                </CardDescription>
            </CardHeader>
        </Card>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {solutions.map((solution) => (
            <Card key={solution.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                   <Badge variant="secondary">Class {solution.class}</Badge>
                   <Badge variant="outline">{solution.type}</Badge>
                </div>
                <CardTitle className="font-headline text-lg pt-2">
                    {solution.title}
                </CardTitle>
                <CardDescription>{solution.subject}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex items-center text-sm text-muted-foreground">
                    <BookCheck className="mr-2"/>
                    <span>{solution.exercises} exercises with detailed solutions.</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View Solutions <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
