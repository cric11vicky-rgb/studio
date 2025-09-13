
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

export type Book = {
  id: string;
  title: string;
  subject: string;
  class: string;
  board: string;
  medium: string;
  file?: File;
  fileName?: string;
  imageUrl: string;
  aiHint: string;
};

const initialBooks: Book[] = [
  // CBSE Books
  { id: '1', board: 'CBSE', title: 'गणित का जादू - कक्षा 3', subject: 'Mathematics', class: '3', medium: 'Hindi', imageUrl: 'https://picsum.photos/300/400?book=cbse-math-3', aiHint: 'math textbook' },
  { id: '2', board: 'CBSE', title: 'रिमझिम - कक्षा 3', subject: 'Hindi', class: '3', medium: 'Hindi', imageUrl: 'https://picsum.photos/300/400?book=cbse-hindi-3', aiHint: 'hindi textbook' },
  { id: '3', board: 'CBSE', title: 'Marigold - Class 3', subject: 'English', class: '3', medium: 'English', imageUrl: 'https://picsum.photos/300/400?book=cbse-eng-3', aiHint: 'english textbook' },
  { id: '4', board: 'CBSE', title: 'Looking Around - Class 3', subject: 'EVS', class: '3', medium: 'English', imageUrl: 'https://picsum.photos/300/400?book=cbse-evs-3', aiHint: 'evs textbook' },
  { id: '5', board: 'RBSE', title: 'गणित - कक्षा 3', subject: 'Mathematics', class: '3', medium: 'Hindi', imageUrl: 'https://picsum.photos/300/400?book=rbse-math-3', aiHint: 'math textbook' },
];


export default function BooksPage() {
  const { selectedClass, setSelectedClass, availableClasses } = useClass();
  const [selectedBoard, setSelectedBoard] = React.useState('All');
  const [selectedMedium, setSelectedMedium] = React.useState('All');
  const [allBooks, setAllBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    const storedBooks = localStorage.getItem('uploadedBooks');
    if (storedBooks) {
      setAllBooks(JSON.parse(storedBooks));
    } else {
        setAllBooks(initialBooks);
    }
  }, []);

  const filteredBooks = allBooks.filter((book) => {
    const classMatch = selectedClass === 'All' || book.class === selectedClass;
    const boardMatch = selectedBoard === 'All' || book.board === selectedBoard;
    const mediumMatch = selectedMedium === 'All' || book.medium === selectedMedium;
    return classMatch && boardMatch && mediumMatch;
  });

  const boards = ['All', ...Array.from(new Set(allBooks.map(b => b.board)))];
  const mediums = ['All', ...Array.from(new Set(allBooks.map(b => b.medium)))];

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Digital Books" />
      <main className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Card>
          <CardContent className="p-4 flex flex-col md:flex-row gap-4 items-center">
            <h2 className="font-headline font-semibold">Find Your Books</h2>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 md:flex md:flex-row md:justify-end gap-4">
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
                <Label htmlFor="medium-filter">Medium</Label>
                <Select
                  value={selectedMedium}
                  onValueChange={setSelectedMedium}
                >
                  <SelectTrigger id="medium-filter" className="w-full md:w-[150px]">
                    <SelectValue placeholder="Select Medium" />
                  </SelectTrigger>
                  <SelectContent>
                    {mediums.map((medium) => (
                      <SelectItem key={medium} value={medium}>
                        {medium}
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
              <Card key={book.id} className="flex flex-col overflow-hidden">
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
                     <div className="flex gap-2 flex-wrap">
                        <Badge variant="outline">Class {book.class}</Badge>
                        <Badge variant="secondary">{book.board}</Badge>
                        <Badge variant="default">{book.medium}</Badge>
                     </div>
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
