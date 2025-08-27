'use client';

import * as React from 'react';
import {
  ArrowRight,
  Book,
  FileText,
  Lightbulb,
  Sparkles,
  Target,
  File,
  MessageSquare,
  ClipboardList
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
    title: 'Generate Practice Paper',
    description: 'Create a custom test with AI',
    icon: Sparkles,
    href: '/generate-paper',
  },
  {
    title: 'My Notes',
    description: 'Review your study notes',
    icon: ClipboardList,
    href: '/notes',
  },
  {
    title: 'Ask a Doubt',
    description: 'Get help from experts',
    icon: MessageSquare,
    href: '/doubts',
  },
   {
    title: 'Textbook Solutions',
    description: 'Find answers to exercises',
    icon: FileText,
    href: '/solutions',
  },
];

const recentActivity = [
  {
    title: 'Finished "Cell Structure" chapter',
    category: 'Science',
    time: '2h ago',
  },
  {
    title: 'Took a practice test on "Algebra"',
    category: 'Maths',
    time: '5h ago',
  },
  {
    title: 'Added new notes on "The Mauryan Empire"',
    category: 'History',
    time: '1d ago',
  },
   {
    title: 'Asked a doubt about "Tenses"',
    category: 'English',
    time: '2d ago',
  },
];

const motivationalQuote = {
  quote: "The secret of getting ahead is getting started.",
  author: "Mark Twain"
}

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader title="Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:col-span-3 bg-secondary border-0 shadow-none">
            <CardHeader>
              <CardTitle className="font-headline text-3xl">Welcome Back, Student!</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Ready to conquer your goals today?
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
             <Card>
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  <Lightbulb className="text-primary" />
                  <span>Quote of the Day</span>
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
                  <Target />
                  <span>Quick Access</span>
                </CardTitle>
                <CardDescription>
                  Jump right back into your learning journey.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                {quickAccessItems.map((item) => (
                   <Link href={item.href} key={item.title}>
                    <Card className="hover:bg-secondary hover:border-primary transition-colors">
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
                <CardTitle className="font-headline">Recent Activity</CardTitle>
                <CardDescription>
                  Here's what you've been up to.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.title} className="flex items-start gap-4">
                       <div className="p-2 bg-secondary rounded-full">
                         <File className="h-4 w-4 text-muted-foreground" />
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
                 <Button variant="outline" className="w-full">View All Activity <ArrowRight className="ml-2 h-4 w-4" /></Button>
               </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
