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
    title: 'Linear Equations in One Variable',
    subject: 'Maths',
    class: '8',
    teacher: 'Mr. Sharma',
    date: 'Today',
    time: '4:00 PM',
    imageUrl: 'https://picsum.photos/600/400',
    aiHint: 'math teacher online',
  },
  {
    title: 'Synthetic Fibres and Plastics',
    subject: 'Science',
    class: '8',
    teacher: 'Mrs. Gupta',
    date: 'Today',
    time: '6:00 PM',
    imageUrl: 'https://picsum.photos/600/400',
    aiHint: 'science online class',
  },
  {
    title: 'The Making of the National Movement',
    subject: 'History',
    class: '8',
    teacher: 'Mr. Singh',
    date: 'Tomorrow',
    time: '5:00 PM',
    imageUrl: 'https://picsum.photos/600/400',
    aiHint: 'history lesson',
  },
  {
    title: 'Active and Passive Voice',
    subject: 'English',
    class: '7',
    teacher: 'Ms. Davis',
    date: 'Tomorrow',
    time: '6:30 PM',
    imageUrl: 'https://picsum.photos/600/400',
    aiHint: 'english grammar lesson',
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
