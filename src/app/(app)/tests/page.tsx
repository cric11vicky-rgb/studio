
'use client';

import * as React from 'react';
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
import { useClass } from '@/context/class-context';

const tests = [
    {
    title: 'Maths Fun Quiz',
    subject: 'Mathematics',
    class: '3',
    questions: 10,
    duration: '15 mins',
  },
  {
    title: 'Our Environment Test',
    subject: 'Environment Studies',
    class: '4',
    questions: 15,
    duration: '20 mins',
  },
  {
    title: 'Science Chapter 1 Test',
    subject: 'Science',
    class: '5',
    questions: 20,
    duration: '30 mins',
  },
  {
    title: 'Social Science - Our Pasts I',
    subject: 'Social Science',
    class: '6',
    questions: 25,
    duration: '40 mins',
  },
  {
    title: 'English Grammar Test',
    subject: 'English',
    class: '7',
    questions: 30,
    duration: '40 mins',
  },
  {
    title: 'Weekly Maths Test - Chapter 3',
    subject: 'Mathematics',
    class: '8',
    questions: 20,
    duration: '45 mins',
  },
  {
    title: 'Physics - Motion and Time',
    subject: 'Science',
    class: '9',
    questions: 25,
    duration: '50 mins',
  },
  {
    title: 'Chemistry - Carbon Compounds',
    subject: 'Science',
    class: '10',
    questions: 30,
    duration: '60 mins',
  },
  {
    title: 'Monthly GK Challenge',
    subject: 'General Knowledge',
    class: 'All',
    questions: 50,
    duration: '60 mins',
  },
    {
    title: 'Physics Mock Test - Units & Dimensions',
    subject: 'Physics (Science)',
    class: '11',
    questions: 30,
    duration: '45 mins',
  },
  {
    title: 'Commerce Aptitude Test',
    subject: 'Business Studies (Commerce)',
    class: '11',
    questions: 40,
    duration: '60 mins',
  },
    {
    title: 'Arts & Humanities Quiz',
    subject: 'History (Arts)',
    class: '11',
    questions: 25,
    duration: '30 mins',
  },
    {
    title: 'NEET Biology Mock Test',
    subject: 'Biology (Science)',
    class: '12',
    questions: 90,
    duration: '90 mins',
  },
  {
    title: 'Economics Board Exam Practice',
    subject: 'Economics (Commerce)',
    class: '12',
    questions: 50,
    duration: '180 mins',
  },
    {
    title: 'Political Science Mock Test',
    subject: 'Political Science (Arts)',
    class: '12',
    questions: 50,
    duration: '120 mins',
  },
  {
    title: 'JEE Mains - Chemistry Practice',
    subject: 'Chemistry (Science)',
    class: '12',
    questions: 30,
    duration: '60 mins',
  },
  {
    title: 'CA Foundation - Principles of Accounting',
    subject: 'Accountancy (Commerce)',
    class: '12',
    questions: 60,
    duration: '120 mins',
  },
];

export default function TestsPage() {
  const { selectedClass } = useClass();

  const filteredTests = tests.filter(
    (test) => selectedClass === 'All' || test.class === selectedClass || test.class === 'All'
  );

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Practice Tests" />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {filteredTests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTests.map((test) => (
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
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border rounded-lg">
            <p className="font-semibold">No tests found for Class {selectedClass}.</p>
            <p className="text-sm mt-1">Please select a different class.</p>
          </div>
        )}
      </main>
    </div>
  );
}
