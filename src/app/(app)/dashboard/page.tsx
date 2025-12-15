
'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Book,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Sparkles,
  StickyNote,
  Tv,
  Video,
  ClipboardList,
  User,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  BarChart2,
  BookCheck,
  BrainCircuit,
} from 'lucide-react';
import { AppHeader } from '@/app/(app)/layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/context/language-context';

const subjectProgress = [
  { subject: 'Mathematics', progress: 85, color: 'bg-primary' },
  { subject: 'Science', progress: 72, color: 'bg-green-500' },
  { subject: 'English', progress: 91, color: 'bg-blue-500' },
  { subject: 'Social Science', progress: 65, color: 'bg-yellow-500' },
];

const quickAccessItems = [
  {
    title: 'Upcoming Live Class',
    description: 'Mathematics - Algebra Basics',
    time: 'Today, 4:00 PM',
    icon: Clock,
    buttonText: 'Join Now',
    href: '/live-class',
  },
  {
    title: 'Recent Test Result',
    description: 'Science - Chapter 5 Test',
    score: 'You scored 88%',
    icon: CheckCircle,
    buttonText: 'View Analysis',
    href: '/tests',
  },
  {
    title: 'New Notes Available',
    description: 'History - The Mauryan Empire',
    icon: StickyNote,
    buttonText: 'Read Now',
    href: '/notes',
  },
];

const menuItems = [
    { href: '/books', label: 'Books', labelHi: 'किताबें', icon: Book },
    { href: '/solutions', label: 'Solutions', labelHi: 'समाधान', icon: BookCheck },
    { href: '/live-class', label: 'Live Classes', labelHi: 'लाइव कक्षाएं', icon: Tv },
    { href: '/classes', label: 'Recorded Classes', labelHi: 'रिकॉर्डेड कक्षाएं', icon: Video },
    { href: '/notes', label: 'Notes', labelHi: 'नोट्स', icon: StickyNote },
    { href: '/generate-paper', label: 'AI Paper Generator', labelHi: 'एआई पेपर जेनरेटर', icon: Sparkles },
    { href: '/ai-solutions', label: 'AI Solutions', labelHi: 'एआई समाधान', icon: BrainCircuit },
    { href: '/previous-papers', label: 'Previous Papers', labelHi: 'पिछले पेपर', icon: FileText },
    { href: '/tests', label: 'Tests', labelHi: 'टेस्ट', icon: ClipboardList },
    { href: '/doubts', label: 'Doubts', labelHi: 'संदेह', icon: HelpCircle },
    { href: '/progress', label: 'Progress', labelHi: 'प्रगति', icon: TrendingUp },
    { href: '/contact', label: 'Help', labelHi: 'सहायता', icon: Mail },
];


export default function DashboardPage() {
  const { language, getTranslation } = useLanguage();
  return (
    <div className="flex h-full flex-col bg-background">
      <header className="flex h-auto flex-wrap items-center justify-between gap-4 border-b bg-card p-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border">
            <AvatarImage src="https://picsum.photos/100" alt="Student" />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-headline text-xl font-bold">
              {getTranslation('Welcome Back')}, Student!
            </h1>
            <p className="text-sm text-muted-foreground">
              {getTranslation("Let's make today productive.")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="outline" size="icon">
            <TrendingUp className="h-5 w-5" />
            <span className="sr-only">Progress</span>
          </Button>
        </div>
      </header>

      <main className="flex-1 space-y-6 p-4 md:p-6">
        {/* Stats Section */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {getTranslation('Completed Tests')}
              </CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 {getTranslation('from last month')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {getTranslation('Attendance')}
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                {getTranslation('in live classes')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {getTranslation('Average Score')}
              </CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82%</div>
              <p className="text-xs text-muted-foreground">
                {getTranslation('across all subjects')}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {getTranslation('Next Live Class')}
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold">{getTranslation('Maths')}</div>
              <p className="text-xs text-muted-foreground">{getTranslation('Today, 4:00 PM')}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Subject Progress Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>{getTranslation('Your Progress')}</CardTitle>
              <CardDescription>
                {getTranslation('Track your scores across different subjects.')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjectProgress.map((subject) => (
                <div key={subject.subject}>
                  <div className="mb-1 flex justify-between">
                    <span className="text-sm font-medium">
                      {getTranslation(subject.subject)}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      {subject.progress}%
                    </span>
                  </div>
                  <Progress value={subject.progress} className={subject.color} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Access Section */}
          <div className="space-y-4">
            <Card>
               <CardHeader>
                <CardTitle>{getTranslation('Quick Access')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 {quickAccessItems.map((item) => (
                  <Link href={item.href} key={item.title}>
                    <div className="flex items-center gap-4 rounded-lg border p-3 hover:bg-secondary transition-colors">
                      <div className="rounded-full bg-primary/10 p-2 text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{getTranslation(item.description)}</p>
                        <p className="text-xs text-muted-foreground">{item.time || item.score}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        <div>
            <CardHeader className="p-0 mb-4">
                <CardTitle className="font-headline">{getTranslation('Explore Smart Vidya')}</CardTitle>
                <CardDescription>{getTranslation('All your learning tools in one place.')}</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {menuItems.map((item) => (
                    <Link href={item.href} key={item.href}>
                    <Card className="flex h-full flex-col items-center justify-center p-4 text-center hover:bg-secondary transition-colors aspect-square">
                        <item.icon className="mb-2 h-8 w-8 text-primary" />
                        <CardTitle className="font-headline text-sm leading-tight">
                            {language === 'English' ? item.label : item.labelHi}
                        </CardTitle>
                    </Card>
                    </Link>
                ))}
            </div>
        </div>
      </main>
    </div>
  );
}
