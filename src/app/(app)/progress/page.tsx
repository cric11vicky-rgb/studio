
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
import { Progress } from '@/components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TrendingUp, BarChart, Activity, Target } from 'lucide-react';

const overallStats = [
    { title: 'Overall Score', value: '82%', icon: TrendingUp },
    { title: 'Completed Lessons', value: '128', icon: Activity },
    { title: 'Average Test Score', value: '78%', icon: BarChart },
    { title: 'Monthly Goal', value: '90% Accuracy', icon: Target },
];

const subjectDetails = [
  { subject: 'Mathematics', score: 85, attendance: '95%', tests: 12 },
  { subject: 'Science', score: 72, attendance: '92%', tests: 10 },
  { subject: 'English', score: 91, attendance: '98%', tests: 15 },
  { subject: 'Social Science', score: 65, attendance: '88%', tests: 8 },
  { subject: 'Hindi', score: 88, attendance: '96%', tests: 11 },
];

export default function ProgressPage() {
  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Progress Report" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Your Academic Snapshot</CardTitle>
                <CardDescription>A detailed overview of your performance and progress.</CardDescription>
            </CardHeader>
        </Card>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {overallStats.map((stat) => (
                 <Card key={stat.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-5 w-5 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{stat.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Subject-wise Performance</CardTitle>
                <CardDescription>Detailed breakdown of your scores and engagement in each subject.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[150px]">Subject</TableHead>
                            <TableHead>Score</TableHead>
                            <TableHead>Attendance</TableHead>
                            <TableHead className="text-right">Tests Taken</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {subjectDetails.map((subject) => (
                            <TableRow key={subject.subject}>
                                <TableCell className="font-medium">{subject.subject}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <span className="w-8">{subject.score}%</span>
                                        <Progress value={subject.score} className="w-[100px] md:w-[200px]"/>
                                    </div>
                                </TableCell>
                                <TableCell>{subject.attendance}</TableCell>
                                <TableCell className="text-right">{subject.tests}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

      </main>
    </div>
  );
}
