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
    title: 'Chapter 1: Rational Numbers',
    subject: 'Maths',
    class: '8',
    exercises: 4,
  },
  {
    title: 'Chapter 2: Microorganisms',
    subject: 'Science',
    class: '8',
    exercises: 5,
  },
  {
    title: 'Chapter 1: How, When and Where',
    subject: 'History',
    class: '8',
    exercises: 3,
  },
  {
    title: 'Poem 1: The Ant and the Cricket',
    subject: 'English',
    class: '8',
    exercises: 2,
  },
  {
    title: 'Chapter 3: Integers',
    subject: 'Maths',
    class: '7',
    exercises: 6,
  },
  {
    title: 'Chapter 4: Heat',
    subject: 'Science',
    class: '7',
    exercises: 4,
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
