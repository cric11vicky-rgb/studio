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
    title: 'Ganit (Mathematics) Class 8',
    subject: 'Mathematics',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400?subject=math',
    aiHint: 'math textbook',
  },
  {
    title: 'Vigyan (Science) Class 8',
    subject: 'Science',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400?subject=science',
    aiHint: 'science textbook',
  },
  {
    title: 'Honeydew - English Reader',
    subject: 'English',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400?subject=english',
    aiHint: 'english textbook',
  },
  {
    title: 'Vasant - Hindi',
    subject: 'Hindi',
    class: '7',
    imageUrl: 'https://picsum.photos/300/400?subject=hindi',
    aiHint: 'hindi textbook',
  },
  {
    title: 'Ruchira - Sanskrit',
    subject: 'Sanskrit',
    class: '6',
    imageUrl: 'https://picsum.photos/300/400?subject=sanskrit',
    aiHint: 'sanskrit textbook',
  },
  {
    title: 'Our Pasts III - Social Science',
    subject: 'Social Science',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400?subject=social',
    aiHint: 'history book',
  },
  {
    title: 'Our Environment',
    subject: 'Environment Studies',
    class: '7',
    imageUrl: 'https://picsum.photos/300/400?subject=environment',
    aiHint: 'environment textbook',
  },
  {
    title: 'General Knowledge 2024',
    subject: 'General Knowledge',
    class: 'All',
    imageUrl: 'https://picsum.photos/300/400?subject=gk',
    aiHint: 'knowledge book',
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
