
import Image from 'next/image';
import { Calendar, Clock, Video } from 'lucide-react';

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

const liveClasses = [
    {
    title: 'Shapes and Space',
    subject: 'Mathematics',
    class: '3',
    teacher: 'Ms. Priya',
    date: 'Today',
    time: '3:00 PM',
    imageUrl: 'https://picsum.photos/600/400?live=math3',
    aiHint: 'math class online',
  },
  {
    title: 'The Story of Food',
    subject: 'Environment Studies',
    class: '4',
    teacher: 'Mr. Anand',
    date: 'Today',
    time: '5:00 PM',
    imageUrl: 'https://picsum.photos/600/400?live=evs4',
    aiHint: 'online class food',
  },
  {
    title: 'The Human Body',
    subject: 'Science',
    class: '5',
    teacher: 'Mrs. Kaur',
    date: 'Tomorrow',
    time: '4:00 PM',
    imageUrl: 'https://picsum.photos/600/400?live=science5',
    aiHint: 'science teacher',
  },
  {
    title: 'Introduction to Sanskrit Grammar',
    subject: 'Sanskrit',
    class: '6',
    teacher: 'Mr. Dwivedi',
    date: 'Today',
    time: '3:00 PM',
    imageUrl: 'https://picsum.photos/600/400?live=sanskrit6',
    aiHint: 'sanskrit class',
  },
  {
    title: 'Active and Passive Voice',
    subject: 'English',
    class: '7',
    teacher: 'Ms. Davis',
    date: 'Tomorrow',
    time: '6:30 PM',
    imageUrl: 'https://picsum.photos/600/400?live=english7',
    aiHint: 'english grammar lesson',
  },
  {
    title: 'Linear Equations in One Variable',
    subject: 'Mathematics',
    class: '8',
    teacher: 'Mr. Sharma',
    date: 'Today',
    time: '4:00 PM',
    imageUrl: 'https://picsum.photos/600/400?live=math8',
    aiHint: 'math teacher online',
  },
  {
    title: 'Structure of the Atom',
    subject: 'Science',
    class: '9',
    teacher: 'Dr. Verma',
    date: 'Day after tomorrow',
    time: '5:30 PM',
    imageUrl: 'https://picsum.photos/600/400?live=science9',
    aiHint: 'chemistry online',
  },
  {
    title: 'Light - Reflection and Refraction',
    subject: 'Science',
    class: '10',
    teacher: 'Mrs. Iyer',
    date: 'Today',
    time: '7:00 PM',
    imageUrl: 'https://picsum.photos/600/400?live=science10',
    aiHint: 'physics class online',
  },
];

export default function LiveClassPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Live Classes" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {liveClasses.map((cls) => (
            <Card
              key={cls.title}
              className="flex flex-col overflow-hidden"
            >
              <CardHeader className="p-0">
                <div className="relative aspect-video w-full">
                  <Image
                    src={cls.imageUrl}
                    alt={cls.title}
                    fill
                    className="object-cover"
                    data-ai-hint={cls.aiHint}
                  />
                  <Badge className="absolute left-2 top-2">
                    Live
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 p-4">
                <Badge variant="outline" className="mb-2">
                  Class {cls.class}
                </Badge>
                <CardTitle className="font-headline text-lg">
                  {cls.title}
                </CardTitle>
                <CardDescription>{cls.subject}</CardDescription>
                <div className="mt-4 flex flex-col space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{cls.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{cls.time}</span>
                  </div>
                   <div className="flex items-center gap-2 font-medium">
                    <span>by {cls.teacher}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">
                  <Video className="mr-2 h-4 w-4" />
                  Join Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
