'use client';

import * as React from 'react';
import {
  ArrowRight,
  Book,
  FileText,
  HelpCircle,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { AppHeader } from '@/app/(app)/layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Progress } from '@/components/ui/progress';

const chartData = [
  { subject: 'Maths', score: 85, fill: 'hsl(var(--chart-1))' },
  { subject: 'Science', score: 92, fill: 'hsl(var(--chart-2))' },
  { subject: 'English', score: 78, fill: 'hsl(var(--chart-3))' },
  { subject: 'History', score: 65, fill: 'hsl(var(--chart-4))' },
  { subject: 'Geography', score: 72, fill: 'hsl(var(--chart-5))' },
];

const chartConfig = {
  score: {
    label: 'Score',
  },
} satisfies ChartConfig;

export default function DashboardPage() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(76), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Dashboard" />
      <main className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Overall Progress
              </CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{progress}%</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
            <CardFooter>
              <Progress value={progress} className="h-2" />
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Courses Completed
              </CardTitle>
              <Book className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+12</div>
              <p className="text-xs text-muted-foreground">
                2 courses in progress
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Taken</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+23</div>
              <p className="text-xs text-muted-foreground">
                Average score: 88%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Doubts Solved</CardTitle>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+5</div>
              <p className="text-xs text-muted-foreground">
                +2 since last week
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle className="font-headline">Subject Mastery</CardTitle>
              <CardDescription>
                Your performance across different subjects.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <ResponsiveContainer>
                  <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="subject"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <YAxis />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="score" radius={8} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle className="font-headline">Quick Actions</CardTitle>
              <CardDescription>
                Jump right back into your learning journey.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <Sparkles className="text-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Generate Practice Paper
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Create a custom test with our AI generator.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Generate
                </Button>
              </div>
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <HelpCircle className="text-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Ask a Doubt
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Got a question? Get it answered by experts.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Ask
                </Button>
              </div>
              <div className="flex items-center space-x-4 rounded-md border p-4">
                <Book className="text-primary" />
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">
                    Continue Reading
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Class 8 Maths, Chapter 5: Data Handling.
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
