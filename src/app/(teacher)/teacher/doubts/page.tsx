
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Bot } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

const allPendingDoubts = [
  {
    id: 1,
    student: 'Aarav Sharma',
    class: '10',
    subject: 'Physics',
    question: 'Can you explain the difference between nuclear fission and fusion with a real-world example for each?',
    timestamp: '2 hours ago',
    avatar: 'https://picsum.photos/100?student=1'
  },
  {
    id: 2,
    student: 'Riya Gupta',
    class: '8',
    subject: 'History',
    question: 'Why was the Battle of Plassey considered a turning point in Indian history?',
    timestamp: '5 hours ago',
    avatar: 'https://picsum.photos/100?student=2'
  },
  {
    id: 3,
    student: 'Karan Patel',
    class: '9',
    subject: 'Mathematics',
    question: 'I am stuck on proving the midpoint theorem. Can you provide a step-by-step proof?',
    timestamp: '1 day ago',
    avatar: 'https://picsum.photos/100?student=3'
  },
  {
    id: 4,
    student: 'Priya Singh',
    class: '12',
    subject: 'Accountancy',
    question: 'What is the difference between capital expenditure and revenue expenditure?',
    timestamp: '3 hours ago',
    avatar: 'https://picsum.photos/100?student=4'
  },
];

export default function DoubtsPage() {
    const { user } = useAuth();
    
    const pendingDoubts = user?.role === 'teacher'
        ? allPendingDoubts.filter(doubt => user.subjects?.includes(doubt.subject))
        : allPendingDoubts;

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Manage Doubts</h2>
        <p className="text-muted-foreground">
          Review and answer questions from your students.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Pending Doubts</CardTitle>
          <CardDescription>
            These are the questions from students that require your attention.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full space-y-4">
            {pendingDoubts.length > 0 ? pendingDoubts.map((doubt) => (
              <AccordionItem value={`item-${doubt.id}`} key={doubt.id} className="border rounded-lg px-4">
                <AccordionTrigger>
                  <div className="flex items-center gap-4 text-left">
                     <Avatar>
                        <AvatarImage src={doubt.avatar} />
                        <AvatarFallback>{doubt.student.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">{doubt.question}</div>
                        <div className="text-sm text-muted-foreground">
                            Asked by {doubt.student} (Class {doubt.class}, {doubt.subject}) • {doubt.timestamp}
                        </div>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-4">
                    <Textarea
                      placeholder={`Type your answer for ${doubt.student}...`}
                      className="min-h-[120px]"
                    />
                    <div className="flex justify-between items-center">
                        <Button variant="outline">
                            <Bot className="mr-2 h-4 w-4"/>
                            Generate AI Suggestion
                        </Button>
                        <Button>
                            <Send className="mr-2 h-4 w-4"/>
                            Post Answer
                        </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            )) : (
                 <div className="text-center p-8 text-muted-foreground">
                    No pending doubts for your assigned subjects.
                </div>
            )}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
