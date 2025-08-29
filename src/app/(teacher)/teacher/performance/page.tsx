
'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const overallPerformanceData = [
  { subject: 'Maths', averageScore: 82, attendance: 95 },
  { subject: 'Science', averageScore: 75, attendance: 92 },
  { subject: 'English', averageScore: 88, attendance: 98 },
  { subject: 'History', averageScore: 71, attendance: 88 },
  { subject: 'Hindi', averageScore: 85, attendance: 96 },
];

const chartConfig: ChartConfig = {
  averageScore: {
    label: 'Average Score (%)',
    color: 'hsl(var(--chart-1))',
  },
  attendance: {
    label: 'Attendance (%)',
    color: 'hsl(var(--chart-2))',
  },
};


const studentData = [
    { id: 1, name: 'Aarav Sharma', class: 10, overallScore: 92, lastTest: '95% (Physics)', attendance: '98%' },
    { id: 2, name: 'Riya Gupta', class: 9, overallScore: 85, lastTest: '88% (Maths)', attendance: '95%' },
    { id: 3, name: 'Karan Patel', class: 10, overallScore: 78, lastTest: '75% (Chemistry)', attendance: '92%' },
    { id: 4, name: 'Sneha Reddy', class: 8, overallScore: 95, lastTest: '98% (English)', attendance: '100%' },
    { id: 5, name: 'Vikram Singh', class: 7, overallScore: 72, lastTest: '70% (History)', attendance: '85%' },
]

export default function PerformancePage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Student Performance</h2>
        <p className="text-muted-foreground">
          Analytics and reports on class and individual student performance.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Class-wise Performance</CardTitle>
          <CardDescription>
            Average scores and attendance across all subjects for Class 10.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={overallPerformanceData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="subject"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="averageScore" fill="var(--color-averageScore)" radius={4} />
              <Bar dataKey="attendance" fill="var(--color-attendance)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
          <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <CardTitle>Individual Student Reports</CardTitle>
                    <CardDescription>Drill down into individual student performance.</CardDescription>
                </div>
                <div className="flex gap-2">
                    <Select>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Class" />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(8)].map((_, i) => (
                                <SelectItem key={i+3} value={`${i + 3}`}>{`Class ${i + 3}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
              </div>
          </CardHeader>
          <CardContent>
              <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Class</TableHead>
                        <TableHead>Overall Score</TableHead>
                        <TableHead>Last Test Score</TableHead>
                        <TableHead>Attendance</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {studentData.map(student => (
                        <TableRow key={student.id}>
                            <TableCell className="font-medium">{student.name}</TableCell>
                            <TableCell>{student.class}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <span>{student.overallScore}%</span>
                                    <Progress value={student.overallScore} className="w-24"/>
                                </div>
                            </TableCell>
                             <TableCell>{student.lastTest}</TableCell>
                            <TableCell>{student.attendance}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
          </CardContent>
      </Card>
    </div>
  );
}
