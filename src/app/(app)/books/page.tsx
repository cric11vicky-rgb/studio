
'use client';

import * as React from 'react';
import Image from 'next/image';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useClass } from '@/context/class-context';

const allBooks = [
  // CBSE Books
  { board: 'CBSE', title: 'गणित का जादू - कक्षा 3', subject: 'Mathematics', class: '3', imageUrl: 'https://picsum.photos/300/400?book=cbse-math-3', aiHint: 'math textbook' },
  { board: 'CBSE', title: 'रिमझिम - कक्षा 3', subject: 'Hindi', class: '3', imageUrl: 'https://picsum.photos/300/400?book=cbse-hindi-3', aiHint: 'hindi textbook' },
  { board: 'CBSE', title: 'Marigold - Class 3', subject: 'English', class: '3', imageUrl: 'https://picsum.photos/300/400?book=cbse-eng-3', aiHint: 'english textbook' },
  { board: 'CBSE', title: 'Looking Around - Class 3', subject: 'EVS', class: '3', imageUrl: 'https://picsum.photos/300/400?book=cbse-evs-3', aiHint: 'evs textbook' },

  { board: 'CBSE', title: 'गणित का जादू - कक्षा 4', subject: 'Mathematics', class: '4', imageUrl: 'https://picsum.photos/300/400?book=cbse-math-4', aiHint: 'math textbook' },
  { board: 'CBSE', title: 'रिमझिम - कक्षा 4', subject: 'Hindi', class: '4', imageUrl: 'https://picsum.photos/300/400?book=cbse-hindi-4', aiHint: 'hindi textbook' },
  { board: 'CBSE', title: 'आस-पास - कक्षा 5', subject: 'EVS', class: '5', imageUrl: 'https://picsum.photos/300/400?book=cbse-evs-5', aiHint: 'environment textbook' },
  { board: 'CBSE', title: 'वसंत - कक्षा 6', subject: 'Hindi', class: '6', imageUrl: 'https://picsum.photos/300/400?book=cbse-hindi-6', aiHint: 'hindi textbook' },
  { board: 'CBSE', title: 'Honeydew - Class 8', subject: 'English', class: '8', imageUrl: 'https://picsum.photos/300/400?book=cbse-eng-8', aiHint: 'english textbook' },
  { board: 'CBSE', title: 'गणित (Ganit) - कक्षा 7', subject: 'Mathematics', class: '7', imageUrl: 'https://picsum.photos/300/400?book=cbse-math-7', aiHint: 'math textbook' },
  { board: 'CBSE', title: 'विज्ञान (Vigyan) - कक्षा 8', subject: 'Science', class: '8', imageUrl: 'https://picsum.photos/300/400?book=cbse-science-8', aiHint: 'science textbook' },
  { board: 'CBSE', title: 'हमारे अतीत - I - कक्षा 6', subject: 'Social Science', class: '6', imageUrl: 'https://picsum.photos/300/400?book=cbse-history-6', aiHint: 'history textbook' },
  { board: 'CBSE', title: 'क्षितिज - कक्षा 9', subject: 'Hindi', class: '9', imageUrl: 'https://picsum.photos/300/400?book=cbse-hindi-9', aiHint: 'hindi textbook' },
  { board: 'CBSE', title: 'Beehive - Class 9', subject: 'English', class: '9', imageUrl: 'https://picsum.photos/300/400?book=cbse-eng-9', aiHint: 'english textbook' },
  { board: 'CBSE', title: 'First Flight - Class 10', subject: 'English', class: '10', imageUrl: 'https://picsum.photos/300/400?book=cbse-eng-10', aiHint: 'english textbook' },
  { board: 'CBSE', title: 'विज्ञान (Vigyan) - कक्षा 10', subject: 'Science', class: '10', imageUrl: 'https://picsum.photos/300/400?book=cbse-science-10', aiHint: 'science textbook' },

  // RBSE Books
  { board: 'RBSE', title: 'गणित - कक्षा 3', subject: 'Mathematics', class: '3', imageUrl: 'https://picsum.photos/300/400?book=rbse-math-3', aiHint: 'math textbook' },
  { board: 'RBSE', title: 'हिन्दी - कक्षा 4', subject: 'Hindi', class: '4', imageUrl: 'https://picsum.photos/300/400?book=rbse-hindi-4', aiHint: 'hindi textbook' },
  { board: 'RBSE', title: 'English Reader - Class 5', subject: 'English', class: '5', imageUrl: 'https://picsum.photos/300/400?book=rbse-eng-5', aiHint: 'english textbook' },
  { board: 'RBSE', title: 'हमारा राजस्थान - कक्षा 6', subject: 'Social Science', class: '6', imageUrl: 'https://picsum.photos/300/400?book=rbse-sst-6', aiHint: 'history textbook' },
  { board: 'RBSE', title: 'विज्ञान - कक्षा 7', subject: 'Science', class: '7', imageUrl: 'https://picsum.photos/300/400?book=rbse-science-7', aiHint: 'science textbook' },
  { board: 'RBSE', title: 'गणित - कक्षा 8', subject: 'Mathematics', class: '8', imageUrl: 'https://picsum.photos/300/400?book=rbse-math-8', aiHint: 'math textbook' },
  { board: 'RBSE', title: 'Golden Rays - Class 9', subject: 'English', class: '9', imageUrl: 'https://picsum.photos/300/400?book=rbse-eng-9', aiHint: 'english textbook' },
  { board: 'RBSE', title: 'विज्ञान - कक्षा 10', subject: 'Science', class: '10', imageUrl: 'https://picsum.photos/300/400?book=rbse-science-10', aiHint: 'science textbook' },
];

export default function BooksPage() {
  const { selectedClass, setSelectedClass, availableClasses } = useClass();
  const [selectedBoard, setSelectedBoard] = React.useState('All');

  const filteredBooks = allBooks.filter((book) => {
    const classMatch = selectedClass === 'All' || book.class === selectedClass;
    const boardMatch = selectedBoard === 'All' || book.board === selectedBoard;
    return classMatch && boardMatch;
  });

  const boards = ['All', ...Array.from(new Set(allBooks.map(b => b.board)))];

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Digital Books" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Card>
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <h2 className="font-headline font-semibold">Find Your Books</h2>
            <div className="flex-1 grid grid-cols-2 md:flex md:flex-row md:justify-end gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="board-filter">Board / Syllabus</Label>
                <Select
                  value={selectedBoard}
                  onValueChange={setSelectedBoard}
                >
                  <SelectTrigger id="board-filter" className="w-full md:w-[180px]">
                    <SelectValue placeholder="Select Board" />
                  </SelectTrigger>
                  <SelectContent>
                    {boards.map((board) => (
                      <SelectItem key={board} value={board}>
                        {board}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="class-filter">Class</Label>
                <Select
                  value={selectedClass}
                  onValueChange={setSelectedClass}
                >
                  <SelectTrigger id="class-filter" className="w-full md:w-[150px]">
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableClasses.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c === 'All' ? 'All Classes' : `Class ${c}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {filteredBooks.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => (
              <Card key={`${book.board}-${book.title}`} className="flex flex-col overflow-hidden">
                <CardHeader className="p-0">
                  <div className="relative aspect-[3/4] w-full">
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      fill
                      className="object-cover"
                      data-ai-hint={book.aiHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="flex-1 p-4">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <Badge variant="outline">Class {book.class}</Badge>
                    <Badge variant="secondary">{book.board}</Badge>
                  </div>
                  <CardTitle className="font-headline text-lg">
                    {book.title}
                  </CardTitle>
                  <CardDescription>{book.subject}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button className="w-full">Read Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border rounded-lg">
            <p className="font-semibold">No books found for the selected filters.</p>
            <p className="text-sm mt-1">Please try a different class or board.</p>
          </div>
        )}
      </main>
    </div>
  );
}
