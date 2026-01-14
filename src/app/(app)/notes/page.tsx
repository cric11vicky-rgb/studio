
'use client';

import * as React from 'react';
import { AppHeader } from '@/app/(app)/layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useClass } from '@/context/class-context';
import { BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/language-context';

type Note = {
  id: number;
  title: string;
  titleHi: string;
  subject: string;
  class: string;
  content: string;
  tags: string[];
};

const chapterNotes: Note[] = [
  {
    id: 1,
    title: 'Living and Non-living things',
    titleHi: 'सजीव और निर्जीव वस्तुएं',
    subject: 'Science',
    class: '3',
    content: 'Living things breathe, eat, grow, move, and reproduce. Non-living things do not. Key features include respiration, nutrition, growth, movement, and reproduction.',
    tags: ['Science', 'Biology'],
  },
  {
    id: 2,
    title: 'Kinds of Nouns (संज्ञा के भेद)',
    titleHi: 'संज्ञा के भेद',
    subject: 'Hindi',
    class: '4',
    content: 'किसी व्यक्ति, वस्तु, स्थान, या भाव के नाम को संज्ञा कहते हैं। इसके तीन मुख्य भेद हैं: व्यक्तिवाचक, जातिवाचक, और भाववाचक। (A noun is the name of a person, place, thing, or idea. It has three main types: Proper Noun, Common Noun, and Abstract Noun.)',
    tags: ['Hindi', 'Grammar'],
  },
  {
    id: 3,
    title: 'The Water Cycle',
    titleHi: 'जल चक्र',
    subject: 'EVS',
    class: '5',
    content: 'The water cycle consists of four main stages: Evaporation (liquid to gas), Condensation (gas to liquid, forming clouds), Precipitation (rain, snow), and Collection (in rivers, lakes).',
    tags: ['EVS', 'Geography'],
  },
  {
    id: 4,
    title: 'Indus Valley Civilization',
    titleHi: 'सिंधु घाटी सभ्यता',
    subject: 'History',
    class: '6',
    content: 'Major cities: Harappa and Mohenjo-Daro. Known for its advanced urban planning, standardized weights, and impressive drainage system. Decline reasons are still debated.',
    tags: ['History', 'Ancient India'],
  },
  {
    id: 5,
    title: 'Acids, Bases, and Salts',
    titleHi: 'अम्ल, क्षार और लवण',
    subject: 'Science',
    class: '7',
    content: 'Acids are sour, turn blue litmus red. Bases are bitter, turn red litmus blue. A salt is formed when an acid and a base react. pH scale measures acidity.',
    tags: ['Science', 'Chemistry'],
  },
  {
    id: 6,
    title: 'Squares and Square Roots',
    titleHi: 'वर्ग और वर्गमूल',
    subject: 'Mathematics',
    class: '8',
    content: 'The square of a number is the number multiplied by itself (e.g., 5x5=25). The square root is the inverse operation. Important to memorize squares up to 20.',
    tags: ['Maths', 'Formula'],
  },
   {
    id: 7,
    title: 'Motion',
    titleHi: 'गति',
    subject: 'Physics (Science)',
    class: '9',
    content: 'Motion is the change in position of an object over time. Key concepts include distance, displacement, speed, velocity, and acceleration. Understand Newton\'s laws of motion.',
    tags: ['Physics', 'Mechanics'],
  },
  {
    id: 8,
    title: 'Carbon and its Compounds',
    titleHi: 'कार्बन और उसके यौगिक',
    subject: 'Chemistry (Science)',
    class: '10',
    content: 'Carbon forms covalent bonds and has the property of catenation, leading to a large number of compounds. Study of hydrocarbons, functional groups, and isomerism.',
    tags: ['Chemistry', 'Organic'],
  },
  {
    id: 9,
    title: 'Sets Theory',
    titleHi: 'समुच्चय सिद्धांत',
    subject: 'Mathematics (Science)',
    class: '11',
    content: 'A set is a collection of well-defined objects. Learn about types of sets, Venn diagrams, operations on sets like union, intersection, and difference.',
    tags: ['Maths', 'Algebra'],
  },
  {
    id: 10,
    title: 'Introduction to Accounting',
    titleHi: 'लेखांकन का परिचय',
    subject: 'Accountancy (Commerce)',
    class: '11',
    content: 'Accounting is the process of recording financial transactions. Key principles include the double-entry system, accounting concepts, and conventions.',
    tags: ['Commerce', 'Accounting'],
  },
  {
    id: 11,
    title: 'Themes in World History: From the Beginning of Time',
    titleHi: 'विश्व इतिहास में विषय: समय की शुरुआत से',
    subject: 'History (Arts)',
    class: '11',
    content: 'This chapter traces the beginning of human existence, from the remote past. It covers early human evolution, hunter-gatherer societies, and the development of tools.',
    tags: ['History', 'World History'],
  },
  {
    id: 12,
    title: 'Electric Charges and Fields',
    titleHi: 'विद्युत आवेश तथा क्षेत्र',
    subject: 'Physics (Science)',
    class: '12',
    content: 'Study of static electric charges, Coulomb\'s law, electric field, electric field lines, electric flux, and Gauss\'s law and its applications.',
    tags: ['Physics', 'Electrostatics'],
  },
  {
    id: 13,
    title: 'Accounting for Partnership Firms: Fundamentals',
    titleHi: 'साझेदारी फर्मों के लिए लेखांकन: मूल बातें',
    subject: 'Accountancy (Commerce)',
    class: '12',
    content: 'Learn about partnership deeds, calculation of interest on capital and drawings, and preparation of Profit and Loss Appropriation Account.',
    tags: ['Commerce', 'Partnership'],
  },
   {
    id: 14,
    title: 'The Cold War Era',
    titleHi: 'शीत युद्ध का दौर',
    subject: 'Political Science (Arts)',
    class: '12',
    content: 'The Cold War was a period of geopolitical tension between the United States and the Soviet Union and their respective allies. Key events include the Cuban Missile Crisis and the arms race.',
    tags: ['Political Science', 'World Politics'],
  },
];

export default function NotesPage() {
  const { selectedClass } = useClass();
  const { language, getTranslation } = useLanguage();

  const filteredNotes = chapterNotes.filter(note => {
    return selectedClass === 'All' || note.class === selectedClass;
  });

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Notes" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">{getTranslation('Chapter Notes')}</CardTitle>
                <CardDescription>
                {getTranslation('Find concise notes for various chapters to help you revise quickly.')}
                </CardDescription>
            </CardHeader>
        </Card>
        {filteredNotes.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredNotes.map((note) => (
              <Card key={note.id} className="flex flex-col">
                <CardHeader>
                   <div className="flex justify-between items-start gap-2">
                        <div className="flex gap-2 flex-wrap">
                            <Badge variant="secondary">{getTranslation('Class')} {note.class}</Badge>
                            {note.tags.map(tag => (
                                <Badge key={tag} variant="outline">{getTranslation(tag)}</Badge>
                            ))}
                        </div>
                        <BookOpen className="h-6 w-6 text-primary shrink-0"/>
                    </div>
                  <CardTitle className="font-headline text-lg pt-2">{language === 'English' ? note.title : note.titleHi}</CardTitle>
                  <CardDescription>{getTranslation(note.subject)}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-muted-foreground line-clamp-4">{note.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-64 border rounded-lg">
            <p className="font-semibold">{getTranslation('No notes found for Class')} {selectedClass}.</p>
            <p className="text-sm mt-1">{getTranslation('Please select a different class.')}</p>
          </div>
        )}
      </main>
    </div>
  );
}
