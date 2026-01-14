
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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { PlusCircle, BookOpen, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

const lessonPlans = [
    { id: 1, class: '10', subject: 'Physics', topic: 'Light - Reflection and Refraction', objectives: 'Understand laws of reflection. Learn about spherical mirrors.', duration: '2 weeks' },
    { id: 2, class: '9', subject: 'History', topic: 'The French Revolution', objectives: 'Causes, events, and consequences of the revolution.', duration: '3 weeks' },
    { id: 3, class: '8', subject: 'Mathematics', topic: 'Linear Equations in One Variable', objectives: 'Solving linear equations. Application in real-world problems.', duration: '2 weeks' },
    { id: 4, class: '11', subject: 'Physics', topic: 'Kinematics', objectives: 'Understanding motion in one and two dimensions.', duration: '3 weeks' },
    { id: 5, class: '12', subject: 'Accountancy', topic: 'Partnership Fundamentals', objectives: 'Learn about partnership deeds and profit distribution.', duration: '2 weeks' },
];

const allSubjects = [
    'Mathematics', 'Science', 'English', 'History', 'Physics', 'Chemistry',
    'Biology', 'Accountancy', 'Business Studies', 'Economics', 'Political Science'
];

export default function CurriculumPage() {
    const { user } = useAuth();

    const teacherSubjects = user?.role === 'teacher' ? user.subjects : allSubjects;

    const filteredLessonPlans = lessonPlans.filter(plan => 
        user?.role === 'admin' || (teacherSubjects && teacherSubjects.includes(plan.subject))
    );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Curriculum Planning</h2>
        <p className="text-muted-foreground">
          Design and organize your lesson plans for the academic year.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Create a New Lesson Plan</CardTitle>
          <CardDescription>
            Structure your teaching by creating a detailed lesson plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="topic">Topic / Chapter Name</label>
              <Input id="topic" placeholder="e.g., The Solar System" />
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
              <label htmlFor="duration">Estimated Duration</label>
              <Input id="duration" placeholder="e.g., 2 Weeks" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label htmlFor="objectives">Learning Objectives</label>
              <Textarea
                id="objectives"
                placeholder="List the key learning outcomes for this topic..."
                className="min-h-[100px]"
              />
            </div>
             <div className="space-y-2 md:col-span-2">
              <label htmlFor="activities">Teaching Activities & Resources</label>
              <Textarea
                id="activities"
                placeholder="Describe activities, assessments, and resources to be used..."
                 className="min-h-[100px]"
              />
            </div>
            <div className="md:col-span-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Lesson Plan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing Lesson Plans</CardTitle>
          <CardDescription>
            Here are the lesson plans you have created for your subjects.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredLessonPlans.map(plan => (
            <Card key={plan.id} className="p-4 flex justify-between items-start">
              <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-primary"/>
                    <h3 className="font-semibold">{plan.topic}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Class:</span> {plan.class} | <span className="font-medium">Subject:</span> {plan.subject} | <span className="font-medium">Duration:</span> {plan.duration}
                  </p>
                   <p className="text-sm text-muted-foreground">
                    <span className="font-medium">Objectives:</span> {plan.objectives}
                  </p>
              </div>
              <div>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
              </div>
            </Card>
          ))}
           {filteredLessonPlans.length === 0 && (
                <div className="text-center p-8 text-muted-foreground">
                    No lesson plans found for your assigned subjects.
                </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
