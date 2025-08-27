
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
    title: 'गणित का जादू - कक्षा 3',
    subject: 'Mathematics',
    class: '3',
    imageUrl: 'https://picsum.photos/300/400?subject=math3',
    aiHint: 'math textbook',
  },
  {
    title: 'रिमझिम - कक्षा 4',
    subject: 'Hindi',
    class: '4',
    imageUrl: 'https://picsum.photos/300/400?subject=hindi4',
    aiHint: 'hindi textbook',
  },
  {
    title: 'आस-पास - कक्षा 5',
    subject: 'Environment Studies',
    class: '5',
    imageUrl: 'https://picsum.photos/300/400?subject=evs5',
    aiHint: 'environment textbook',
  },
  {
    title: 'वसंत - कक्षा 6',
    subject: 'Hindi',
    class: '6',
    imageUrl: 'https://picsum.photos/300/400?subject=hindi6',
    aiHint: 'hindi textbook',
  },
  {
    title: 'Honeydew - Class 8',
    subject: 'English',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400?subject=english8',
    aiHint: 'english textbook',
  },
  {
    title: 'गणित (Ganit) - कक्षा 7',
    subject: 'Mathematics',
    class: '7',
    imageUrl: 'https://picsum.photos/300/400?subject=math7',
    aiHint: 'math textbook',
  },
  {
    title: 'विज्ञान (Vigyan) - कक्षा 8',
    subject: 'Science',
    class: '8',
    imageUrl: 'https://picsum.photos/300/400?subject=science8',
    aiHint: 'science textbook',
  },
  {
    title: 'हमारे अतीत - I - कक्षा 6',
    subject: 'Social Science',
    class: '6',
    imageUrl: 'https://picsum.photos/300/400?subject=history6',
    aiHint: 'history textbook',
  },
  {
    title: 'क्षितिज - कक्षा 9',
    subject: 'Hindi',
    class: '9',
    imageUrl: 'https://picsum.photos/300/400?subject=hindi9',
    aiHint: 'hindi textbook',
  },
  {
    title: 'Beehive - Class 9',
    subject: 'English',
    class: '9',
    imageUrl: 'https://picsum.photos/300/400?subject=english9',
    aiHint: 'english textbook',
  },
  {
    title: 'First Flight - Class 10',
    subject: 'English',
    class: '10',
    imageUrl: 'https://picsum.photos/300/400?subject=english10',
    aiHint: 'english textbook',
  },
  {
    title: 'विज्ञान (Vigyan) - कक्षा 10',
    subject: 'Science',
    class: '10',
    imageUrl: 'https://picsum.photos/300/400?subject=science10',
    aiHint: 'science textbook',
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
