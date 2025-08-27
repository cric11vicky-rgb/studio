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

const books = [
  {
    title: 'Mathematics Class 8',
    subject: 'Maths',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400',
    aiHint: 'textbook cover',
  },
  {
    title: 'Science Class 8',
    subject: 'Science',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400',
    aiHint: 'science textbook',
  },
  {
    title: 'History: Our Pasts III',
    subject: 'Social Science',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400',
    aiHint: 'history book',
  },
  {
    title: 'Honeydew - English',
    subject: 'English',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400',
    aiHint: 'english textbook',
  },
  {
    title: 'Mathematics Class 7',
    subject: 'Maths',
    class: '7',
    imageUrl: 'https://picsum.photos/300/400',
    aiHint: 'math textbook',
  },
  {
    title: 'Science Class 7',
    subject: 'Science',
    class: '7',
    imageUrl: 'https://picsum.photos/300/400',
    aiHint: 'school textbook',
  },
  {
    title: 'Mathematics Class 6',
    subject: 'Maths',
    class: '6',
    imageUrl: 'https://picsum.photos/300/400',
    aiHint: 'textbook design',
  },
  {
    title: 'Science Class 6',
    subject: 'Science',
    class: '6',
    imageUrl: 'https://picsum.photos/300/400',
    aiHint: 'educational book',
  },
];

export default function BooksPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Digital Books" />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {books.map((book) => (
            <Card key={book.title} className="flex flex-col overflow-hidden">
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
                <Badge variant="outline" className="mb-2">
                  Class {book.class}
                </Badge>
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
      </main>
    </div>
  );
}
