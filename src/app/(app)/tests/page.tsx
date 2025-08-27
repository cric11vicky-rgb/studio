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
import { FileText } from 'lucide-react';

const tests = [
  {
    title: 'Weekly Maths Test - Chapter 3',
    subject: 'Maths',
    class: '8',
    questions: 20,
    duration: '45 mins',
  },
  {
    title: 'Science Mock Test - Physics',
    subject: 'Science',
    class: '8',
    questions: 25,
    duration: '50 mins',
  },
  {
    title: 'History Quiz - The Mughal Empire',
    subject: 'History',
    class: '8',
    questions: 15,
    duration: '20 mins',
  },
  {
    title: 'English Grammar Test',
    subject: 'English',
    class: '7',
    questions: 30,
    duration: '40 mins',
  },
  {
    title: 'Full Syllabus Mock Test 1',
    subject: 'All Subjects',
    class: '8',
    questions: 100,
    duration: '180 mins',
  },
  {
    title: 'Chemistry Test - Metals & Non-metals',
    subject: 'Science',
    class: '8',
    questions: 20,
    duration: '35 mins',
  },
];

export default function TestsPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Practice Tests" />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tests.map((test) => (
            <Card key={test.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      Class {test.class}
                    </Badge>
                    <CardTitle className="font-headline text-lg">
                      {test.title}
                    </CardTitle>
                    <CardDescription>{test.subject}</CardDescription>
                  </div>
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <FileText className="h-6 w-6" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{test.questions} Questions</span>
                  <span>{test.duration}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Start Test</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
