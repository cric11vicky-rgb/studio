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
    title: 'Science: Photosynthesis',
    content: 'Chlorophyll, sunlight, carbon dioxide, and water are essential.',
    timestamp: '2 days ago',
  },
  {
    id: 2,
    title: 'Mathematics: Algebra Formulas',
    content: '(a+b)^2 = a^2 + 2ab + b^2',
    timestamp: '5 days ago',
  },
  {
    id: 3,
    title: 'English: Noun Types',
    content: 'Proper, Common, Collective, Abstract, Material.',
    timestamp: '1 week ago',
  },
  {
    id: 4,
    title: 'Hindi: Sandhi ke Bhed',
    content: 'Swar Sandhi, Vyanjan Sandhi, Visarg Sandhi.',
    timestamp: '1 week ago',
  },
  {
    id: 5,
    title: 'Social Science: Major Rivers of India',
    content: 'Ganga, Yamuna, Brahmaputra, Godavari, Krishna, Narmada.',
    timestamp: '2 weeks ago',
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
