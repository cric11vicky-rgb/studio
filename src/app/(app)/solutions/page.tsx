
'use client';

import * as React from 'react';
import { ArrowRight, BookCheck } from 'lucide-react';
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
import { useLanguage } from '@/context/language-context';
import { useClass } from '@/context/class-context';

const solutions = [
    {
    title: 'Chapter 1: Where to Look From',
    titleHi: 'अध्याय 1: कहाँ से देखें',
    subject: 'Mathematics',
    class: '3',
    exercises: 3,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Poonam\'s Day Out',
    titleHi: 'अध्याय 1: पूनम का दिन',
    subject: 'Environment Studies',
    class: '3',
    exercises: 4,
    type: 'NCERT'
  },
    {
    title: 'Chapter 1: Building with Bricks',
    titleHi: 'अध्याय 1: ईंटों से बनी इमारत',
    subject: 'Mathematics',
    class: '4',
    exercises: 5,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Super Senses',
    titleHi: 'अध्याय 1: सुपर सेंस',
    subject: 'Environment Studies',
    class: '5',
    exercises: 4,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Knowing Our Numbers',
    titleHi: 'अध्याय 1: हमारी संख्या जानना',
    subject: 'Mathematics',
    class: '6',
    exercises: 3,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Integers',
    titleHi: 'अध्याय 1: पूर्णांक',
    subject: 'Mathematics',
    class: '7',
    exercises: 4,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Rational Numbers',
    titleHi: 'अध्याय 1: परिमेय संख्याएं',
    subject: 'Mathematics',
    class: '8',
    exercises: 4,
    type: 'Sample Paper'
  },
  {
    title: 'Chapter 1: Number Systems',
    titleHi: 'अध्याय 1: संख्या प्रणाली',
    subject: 'Mathematics',
    class: '9',
    exercises: 6,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Real Numbers',
    titleHi: 'अध्याय 1: वास्तविक संख्याएं',
    subject: 'Mathematics',
    class: '10',
    exercises: 4,
    type: 'NCERT'
  },
  {
    title: 'Chapter 2: Microorganisms',
    titleHi: 'अध्याय 2: सूक्ष्मजीव',
    subject: 'Science',
    class: '8',
    exercises: 5,
    type: 'NCERT'
  },
  {
    title: 'Poem 1: The Ant and the Cricket',
    titleHi: 'कविता 1: चींटी और क्रिकेट',
    subject: 'English',
    class: '8',
    exercises: 2,
    type: 'NCERT'
  },
  {
    title: 'Indian States and Capitals',
    titleHi: 'भारतीय राज्य और राजधानियाँ',
    subject: 'General Knowledge',
    class: 'All',
    exercises: 1,
    type: 'Worksheet'
  },
    {
    title: 'Chapter 1: Sets',
    titleHi: 'अध्याय 1: समुच्चय',
    subject: 'Mathematics (Science)',
    class: '11',
    exercises: 6,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Introduction to Accounting',
    titleHi: 'अध्याय 1: लेखांकन का परिचय',
    subject: 'Accountancy (Commerce)',
    class: '11',
    exercises: 4,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: The Living World',
    titleHi: 'अध्याय 1: जीव जगत',
    subject: 'Biology (Science)',
    class: '11',
    exercises: 5,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Relations and Functions',
    titleHi: 'अध्याय 1: संबंध और फलन',
    subject: 'Mathematics (Science)',
    class: '12',
    exercises: 4,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Accounting for Not-for-Profit Organization',
    titleHi: 'अध्याय 1: गैर-लाभकारी संगठन के लिए लेखांकन',
    subject: 'Accountancy (Commerce)',
    class: '12',
    exercises: 7,
    type: 'NCERT'
  },
  {
    title: 'Chapter 1: Reproduction in Organisms',
    titleHi: 'अध्याय 1: जीवों में जनन',
    subject: 'Biology (Science)',
    class: '12',
    exercises: 5,
    type: 'NCERT'
  },
];

export default function SolutionsPage() {
  const { language } = useLanguage();
  const { selectedClass } = useClass();

  const filteredSolutions = solutions.filter(
    (solution) => selectedClass === 'All' || solution.class === selectedClass || solution.class === 'All'
  );

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Textbook Solutions" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
         <Card>
            <CardHeader>
                <CardTitle className="font-headline">{language === 'English' ? 'Find Textbook Solutions' : 'पाठ्यपुस्तक समाधान खोजें'}</CardTitle>
                <CardDescription>
                {language === 'English' ? 'Get step-by-step solutions for textbook questions, including NCERT and sample papers, to help you understand concepts better and prepare for exams.' : 'अवधारणाओं को बेहतर ढंग से समझने और परीक्षा की तैयारी में मदद के लिए एनसीईआरटी और सैंपल पेपर सहित पाठ्यपुस्तक के प्रश्नों के लिए चरण-दर-चरण समाधान प्राप्त करें।'}
                </CardDescription>
            </CardHeader>
        </Card>
        {filteredSolutions.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSolutions.map((solution) => (
              <Card key={solution.title} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <Badge variant="secondary">Class {solution.class}</Badge>
                    <Badge variant="outline">{solution.type}</Badge>
                  </div>
                  <CardTitle className="font-headline text-lg pt-2">
                      {language === 'English' ? solution.title : solution.titleHi}
                  </CardTitle>
                  <CardDescription>{solution.subject}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                      <BookCheck className="mr-2"/>
                      <span>{solution.exercises} {language === 'English' ? 'exercises with detailed solutions.' : 'विस्तृत समाधान के साथ अभ्यास।'}</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    {language === 'English' ? 'View Solutions' : 'समाधान देखें'} <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border rounded-lg">
            <p className="font-semibold">No solutions found for Class {selectedClass}.</p>
            <p className="text-sm mt-1">Please select a different class.</p>
          </div>
        )}
      </main>
    </div>
  );
}
