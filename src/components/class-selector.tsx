
'use client';

import React from 'react';
import { useClass } from '@/context/class-context';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from './ui/card';
import { GraduationCap } from 'lucide-react';

export default function ClassSelector() {
  const { isModalOpen, setModalOpen, setSelectedClass, availableClasses, selectedClass } = useClass();

  // We don't want to show 'All' in the initial selector
  const classOptions = availableClasses.filter(c => c !== 'All');

  return (
    <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
      <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-center">Welcome to EduVerse!</DialogTitle>
          <DialogDescription className="text-center">
            Please select your class to get started.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 py-4">
          {classOptions.map((classNum) => (
             <Card 
                key={classNum}
                className={`flex flex-col items-center justify-center p-4 text-center hover:bg-secondary transition-colors aspect-square cursor-pointer ${selectedClass === classNum ? 'bg-primary text-primary-foreground' : ''}`}
                onClick={() => setSelectedClass(classNum)}
            >
                <GraduationCap className="mb-2 h-8 w-8" />
                <CardContent className="p-0">
                    <p className="font-semibold">Class {classNum}</p>
                </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
