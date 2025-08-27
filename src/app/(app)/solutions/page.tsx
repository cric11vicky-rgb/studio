
import { ArrowRight } from 'lucide-react';
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
  },
  {
    title: 'Chapter 1: Poonam\'s Day Out',
    subject: 'Environment Studies',
    class: '3',
    exercises: 4,
  },
    {
    title: 'Chapter 1: Building with Bricks',
    subject: 'Mathematics',
    class: '4',
    exercises: 5,
  },
  {
    title: 'Chapter 1: Super Senses',
    subject: 'Environment Studies',
    class: '5',
    exercises: 4,
  },
  {
    title: 'Chapter 1: Knowing Our Numbers',
    subject: 'Mathematics',
    class: '6',
    exercises: 3,
  },
  {
    title: 'Chapter 1: Integers',
    subject: 'Mathematics',
    class: '7',
    exercises: 4,
  },
  {
    title: 'Chapter 1: Rational Numbers',
    subject: 'Mathematics',
    class: '8',
    exercises: 4,
  },
  {
    title: 'Chapter 1: Number Systems',
    subject: 'Mathematics',
    class: '9',
    exercises: 6,
  },
  {
    title: 'Chapter 1: Real Numbers',
    subject: 'Mathematics',
    class: '10',
    exercises: 4,
  },
  {
    title: 'Chapter 2: Microorganisms',
    subject: 'Science',
    class: '8',
    exercises: 5,
  },
  {
    title: 'Poem 1: The Ant and the Cricket',
    subject: 'English',
    class: '8',
    exercises: 2,
  },
  {
    title: 'Indian States and Capitals',
    subject: 'General Knowledge',
    class: 'All',
    exercises: 1,
  },
];

export default function SolutionsPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Textbook Solutions" />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => (
            <Card key={solution.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-headline text-lg">
                    {solution.title}
                  </CardTitle>
                  <Badge variant="secondary">Class {solution.class}</Badge>
                </div>
                <CardDescription>{solution.subject}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm text-muted-foreground">
                  {solution.exercises} exercises with detailed solutions.
                </p>
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
