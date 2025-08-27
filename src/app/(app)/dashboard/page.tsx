'use client';

import * as React from 'react';
import {
  BookOpen,
  Video,
  FileText,
  Sparkles,
  CheckCircle,
  Presentation,
  Book,
  PenSquare,
} from 'lucide-react';
import { AppHeader } from '@/app/(app)/layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const quickAccessItems = [
  {
    title: 'Digital Books',
    description: 'Access your textbooks anytime',
    icon: BookOpen,
    href: '/books',
  },
  {
    title: 'Recorded Classes',
    description: 'Watch lessons at your own pace',
    icon: Video,
    href: '/classes',
  },
  {
    title: 'Textbook Solutions',
    description: 'Find answers to exercises',
    icon: FileText,
    href: '/solutions',
  },
  {
    title: 'AI Paper Generator',
    description: 'Create practice tests',
    icon: Sparkles,
    href: '/generate-paper',
  },
];

const recentActivity = [
  {
    title: 'Read Chapter 3 of Science book',
    category: 'Science',
    time: '45m ago',
    icon: Book,
  },
  {
    title: 'Watched "Algebraic Expressions" class',
    category: 'Maths',
    time: '2h ago',
    icon: Presentation,
  },
  {
    title: 'Finished notes on "The Indian Constitution"',
    category: 'Civics',
    time: 'Yesterday',
    icon: PenSquare,
  },
   {
    title: 'Solved practice problems for "Integers"',
    category: 'Maths',
    time: '2d ago',
    icon: CheckCircle,
  },
];

const motivationalQuote = {
  quote: "The beautiful thing about learning is that no one can take it away from you.",
  author: "B.B. King"
}

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader title="Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:col-span-3 bg-card border shadow-sm">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Welcome Back, Student!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                A new day to learn something amazing.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
             <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                   <span>Thought for the Day</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="border-l-4 border-primary pl-4 italic text-lg">
                  <p>"{motivationalQuote.quote}"</p>
                  <cite className="mt-2 block text-right text-base not-italic text-muted-foreground">- {motivationalQuote.author}</cite>
                </blockquote>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <span>Quick Access</span>
                </CardTitle>
                <CardDescription>
                  Jump right back into your learning journey.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {quickAccessItems.map((item) => (
                   <Link href={item.href} key={item.title}>
                    <Card className="hover:bg-secondary hover:border-primary transition-colors h-full">
                        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <item.icon className="h-6 w-6 text-primary" />
                            </div>
                            <CardTitle className="text-base font-medium">
                                {item.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </CardContent>
                    </Card>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Here's what you've been up to.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.title} className="flex items-start gap-4">
                       <div className="p-2 bg-secondary rounded-full">
                         <activity.icon className="h-4 w-4 text-muted-foreground" />
                       </div>
                       <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <Badge variant="outline">{activity.category}</Badge>
                            <span>{activity.time}</span>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
