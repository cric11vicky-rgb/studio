'use client';

import * as React from 'react';
import {
  ArrowRight,
  ClipboardEdit,
  Presentation,
  CheckCircle,
  BarChart,
  FileQuestion,
  BookOpen,
  CalendarDays,
  Annoyed,
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
    title: 'Start Mock Test',
    description: 'Practice with a full-length test',
    icon: ClipboardEdit,
    href: '/generate-paper',
  },
  {
    title: 'Daily Practice Problems',
    description: 'Solve curated daily questions',
    icon: CheckCircle,
    href: '#',
  },
  {
    title: 'Performance Analysis',
    description: 'Track your progress and scores',
    icon: BarChart,
    href: '#',
  },
   {
    title: 'Previous Year Questions',
    description: 'Review past exam papers',
    icon: FileQuestion,
    href: '#',
  },
];

const recentActivity = [
  {
    title: 'Scored 85% in "Trigonometry" mock test',
    category: 'Maths',
    time: '1h ago',
    icon: CheckCircle,
  },
  {
    title: 'Live class "Optics" scheduled for 5 PM',
    category: 'Physics',
    time: 'Today',
    icon: Presentation,
  },
  {
    title: 'Submitted "Chemical Reactions" assignment',
    category: 'Chemistry',
    time: 'Yesterday',
    icon: BookOpen,
  },
   {
    title: 'New announcement from your batch',
    category: 'General',
    time: '2d ago',
    icon: Annoyed,
  },
];

const motivationalQuote = {
  quote: "Success is the sum of small efforts, repeated day in and day out.",
  author: "Robert Collier"
}

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader title="Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:col-span-3 bg-card border shadow-sm">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Welcome Back, Aspirant!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Stay focused and keep up the hard work.
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
                  <span>Quick Actions</span>
                </CardTitle>
                <CardDescription>
                  Your essential tools for exam preparation.
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
                    <CalendarDays />
                    <span>Recent Activity</span>
                </CardTitle>
                <CardDescription>
                  Here's a summary of your recent progress.
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
               <CardContent>
                 <Button variant="outline" className="w-full">View Full Timeline <ArrowRight className="ml-2 h-4 w-4" /></Button>
               </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
