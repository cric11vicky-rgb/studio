
'use client';

import { useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';
import { AppHeader } from '@/app/(app)/layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';

type Note = {
  id: number;
  title: string;
  content: string;
  timestamp: string;
};

const initialNotes: Note[] = [
    {
    id: 1,
    title: 'Class 3 Science: Living and Non-living things',
    content: 'Living things breathe, eat, grow, move, and reproduce. Non-living things do not.',
    timestamp: '1 day ago',
  },
  {
    id: 2,
    title: 'Class 4 Hindi: संज्ञा',
    content: 'किसी व्यक्ति, वस्तु, स्थान, या भाव के नाम को संज्ञा कहते हैं।',
    timestamp: '3 days ago',
  },
  {
    id: 3,
    title: 'Class 5 EVS: Water Cycle',
    content: 'Evaporation -> Condensation -> Precipitation -> Collection',
    timestamp: '4 days ago',
  },
  {
    id: 4,
    title: 'Class 6 History: Indus Valley Civilization',
    content: 'Major cities: Harappa and Mohenjo-Daro. Well-planned cities, drainage system.',
    timestamp: '1 week ago',
  },
  {
    id: 5,
    title: 'Class 7 Science: Acids and Bases',
    content: 'Acids are sour, turn blue litmus red. Bases are bitter, turn red litmus blue.',
    timestamp: '1 week ago',
  },
  {
    id: 6,
    title: 'Class 8 Maths: Squares and Square Roots',
    content: 'The square of a number is the number multiplied by itself. Square root is the inverse.',
    timestamp: '2 weeks ago',
  },
  {
    id: 7,
    title: 'Class 9 English: The Road Not Taken',
    content: 'Poem by Robert Frost about choices and their impact on life.',
    timestamp: '2 weeks ago',
  },
  {
    id: 8,
    title: 'Class 10 Social Science: Nationalism in India',
    content: 'Key events: Non-Cooperation Movement, Civil Disobedience Movement, Quit India Movement.',
    timestamp: '3 weeks ago',
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  const handleAddNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote: Note = {
        id: Date.now(),
        title: newNoteTitle,
        content: newNoteContent,
        timestamp: 'Just now',
      };
      setNotes([newNote, ...notes]);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };
  
  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  }

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="My Notes" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Create a New Note</CardTitle>
            <CardDescription>
              Jot down important points from your lessons.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Note title..."
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="font-semibold"
            />
            <Textarea
              placeholder="Start writing your note here..."
              className="min-h-[120px]"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
            />
            <Button onClick={handleAddNote}>
              <PlusCircle className="mr-2 h-4 w-4" />
              Save Note
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="font-headline text-2xl font-semibold">Your Saved Notes</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notes.map((note) => (
              <Card key={note.id} className="flex flex-col">
                <CardHeader className="flex-row items-start justify-between">
                  <div>
                    <CardTitle className="font-headline text-lg">{note.title}</CardTitle>
                    <CardDescription>{note.timestamp}</CardDescription>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleDeleteNote(note.id)}>
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete note</span>
                  </Button>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm">{note.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
