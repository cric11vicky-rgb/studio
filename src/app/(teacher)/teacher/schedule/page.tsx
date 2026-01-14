
'use client';

import * as React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon, PlusCircle, Video } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@/context/auth-context';


const upcomingClasses = [
    { id: 1, title: 'Introduction to Trigonometry', class: '10', subject: 'Mathematics', date: '2023-11-05', time: '4:00 PM' },
    { id: 2, title: 'Chemical Reactions and Equations', class: '10', subject: 'Science', date: '2023-11-06', time: '5:30 PM' },
    { id: 3, title: 'The Rise of Nationalism in Europe', class: '9', subject: 'History', date: '2023-11-07', time: '3:00 PM' },
    { id: 4, title: 'Vectors and 3D Geometry', class: '12', subject: 'Mathematics', date: '2023-11-08', time: '6:00 PM' },
]

const allSubjects = [
    'Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry',
    'Biology', 'Accountancy', 'Business Studies', 'Economics', 'Political Science'
];


export default function SchedulePage() {
  const [date, setDate] = React.useState<Date>();
  const { user } = useAuth();
  
  const teacherSubjects = user?.role === 'teacher' ? user.subjects : allSubjects;

  const filteredClasses = user?.role === 'teacher' 
    ? upcomingClasses.filter(c => teacherSubjects?.includes(c.subject))
    : upcomingClasses;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Schedule Live Classes</h2>
        <p className="text-muted-foreground">
          Plan and manage your upcoming live classes for students.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Create New Class</CardTitle>
            <CardDescription>Fill in the details to schedule a new class.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="title">Class Title</label>
              <Input id="title" placeholder="e.g., Introduction to Algebra" />
            </div>
            <div className="space-y-2">
              <label htmlFor="subject">Subject</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Subject" />
                </SelectTrigger>
                <SelectContent>
                    {teacherSubjects?.map(subject => (
                        <SelectItem key={subject} value={subject.toLowerCase().replace(' ', '_')}>{subject}</SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <label htmlFor="class">Class</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {[...Array(10)].map((_, i) => (
                    <SelectItem key={i+3} value={`${i + 3}`}>{`Class ${i + 3}`}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
                <label>Date</label>
                <Popover>
                    <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                    />
                    </PopoverContent>
                </Popover>
            </div>
             <div className="space-y-2">
                <label htmlFor="time">Time</label>
                <Input id="time" type="time" />
             </div>

            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule Class
            </Button>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
            <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>Here is a list of your scheduled classes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {filteredClasses.length > 0 ? filteredClasses.map(cls => (
                    <Card key={cls.id} className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="font-semibold">{cls.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Class {cls.class} • {cls.subject}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {format(new Date(cls.date), 'PPP')} at {cls.time}
                                </p>
                            </div>
                            <Button variant="outline" size="sm">
                                <Video className="mr-2 h-4 w-4"/>
                                Start Class
                            </Button>
                        </div>
                    </Card>
                )) : (
                     <div className="text-center p-8 text-muted-foreground">
                        No upcoming classes for your subjects.
                    </div>
                )}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
