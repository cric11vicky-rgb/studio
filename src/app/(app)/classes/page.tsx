
import Image from 'next/image';
import { PlayCircle } from 'lucide-react';
import { AppHeader } from '@/app/(app)/layout';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const classes = [
  {
    title: 'Fun with Numbers',
    subject: 'Mathematics',
    class: '3',
    duration: '30 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=math3',
    aiHint: 'math class',
  },
  {
    title: 'The World of Plants',
    subject: 'Environment Studies',
    class: '4',
    duration: '35 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=evs4',
    aiHint: 'science class',
  },
  {
    title: 'Knowing Our Body',
    subject: 'Science',
    class: '5',
    duration: '40 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=science5',
    aiHint: 'biology class',
  },
  {
    title: 'Introduction to History',
    subject: 'Social Science',
    class: '6',
    duration: '45 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=social6',
    aiHint: 'history lesson',
  },
  {
    title: 'Introduction to Fractions',
    subject: 'Mathematics',
    class: '7',
    duration: '30 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=math7',
    aiHint: 'online class',
  },
  {
    title: 'Cell Structure and Functions',
    subject: 'Science',
    class: '8',
    duration: '55 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=science8',
    aiHint: 'science class',
  },
  {
    title: 'The French Revolution',
    subject: 'Social Science',
    class: '9',
    duration: '50 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=social9',
    aiHint: 'history documentary',
  },
  {
    title: 'Chemical Reactions and Equations',
    subject: 'Science',
    class: '10',
    duration: '60 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=science10',
    aiHint: 'chemistry lesson',
  },
  {
    title: 'Stories from the Panchatantra',
    subject: 'Sanskrit',
    class: '6',
    duration: '40 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=sanskrit',
    aiHint: 'sanskrit story',
  },
  {
    title: 'Famous Inventions and Inventors',
    subject: 'General Knowledge',
    class: 'All',
    duration: '30 mins',
    imageUrl: 'https://picsum.photos/600/400?rec=gk',
    aiHint: 'inventions presentation',
  },
];

export default function ClassesPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Recorded Classes" />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {classes.map((cls) => (
            <Card key={cls.title} className="overflow-hidden group">
              <div className="relative">
                <div className="aspect-video w-full overflow-hidden">
                  <Image
                    src={cls.imageUrl}
                    alt={cls.title}
                    width={600}
                    height={400}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={cls.aiHint}
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <PlayCircle className="h-12 w-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all" />
                </div>
                <Badge className="absolute top-2 right-2">{cls.duration}</Badge>
              </div>
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-1">
                  Class {cls.class}
                </Badge>
                <CardTitle className="font-headline text-lg">
                  {cls.title}
                </CardTitle>
                <CardDescription>{cls.subject}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
