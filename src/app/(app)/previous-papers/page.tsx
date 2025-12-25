
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
import { Download, FileText, BookCheck } from 'lucide-react';
import { useClass } from '@/context/class-context';

const papers = [
    {
    title: 'CBSE Class 10 Science 2023',
    subject: 'Science',
    class: '10',
    year: 2023,
    board: 'CBSE',
  },
  {
    title: 'RBSE Class 12 Maths 2022',
    subject: 'Mathematics',
    class: '12',
    year: 2022,
    board: 'RBSE',
  },
  {
    title: 'CBSE Class 10 Social Science 2021',
    subject: 'Social Science',
    class: '10',
    year: 2021,
    board: 'CBSE',
  },
  {
    title: 'CBSE Class 9 English 2023',
    subject: 'English',
    class: '9',
    year: 2023,
    board: 'CBSE',
  },
];

export default function PreviousPapersPage() {
  const { selectedClass } = useClass();

  const filteredPapers = papers.filter(
    (paper) => selectedClass === 'All' || paper.class === selectedClass
  );

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Previous Year Papers" />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        {filteredPapers.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map((paper) => (
              <Card key={paper.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">Class {paper.class}</Badge>
                        <Badge variant="outline">{paper.board}</Badge>
                      </div>
                      <CardTitle className="font-headline text-lg">
                        {paper.title}
                      </CardTitle>
                      <CardDescription>{paper.subject}</CardDescription>
                    </div>
                    <div className="rounded-full bg-primary/10 p-3 text-primary">
                      <FileText className="h-6 w-6" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Year: {paper.year}</span>
                  </div>
                </CardContent>
                <CardFooter className="grid grid-cols-2 gap-4">
                  <Button className="w-full">
                    <Download className="mr-2"/>
                    Download Paper
                  </Button>
                  <Button variant="outline" className="w-full">
                    <BookCheck className="mr-2"/>
                    View Solution
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border rounded-lg">
            <p className="font-semibold">No previous papers found for Class {selectedClass}.</p>
            <p className="text-sm mt-1">Please select a different class.</p>
          </div>
        )}
      </main>
    </div>
  );
}
