
'use client';

import { useState } from 'react';
import { PlusCircle, Trash2, Download, Search } from 'lucide-react';
import { AppHeader } from '@/app/(app)/layout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
  tags: string[];
};

const initialNotes: Note[] = [
    {
    id: 1,
    title: 'Science: Living and Non-living things',
    content: 'Living things breathe, eat, grow, move, and reproduce. Non-living things do not. Key features include respiration, nutrition, growth, movement, and reproduction. Created a mindmap for quick revision.',
    timestamp: '1 day ago',
    tags: ['Class 3', 'Science', 'Mindmap']
  },
  {
    id: 2,
    title: 'Hindi: संज्ञा के भेद',
    content: 'किसी व्यक्ति, वस्तु, स्थान, या भाव के नाम को संज्ञा कहते हैं। इसके तीन मुख्य भेद हैं: व्यक्तिवाचक, जातिवाचक, और भाववाचक।',
    timestamp: '3 days ago',
    tags: ['Class 4', 'Hindi', 'Grammar']
  },
  {
    id: 3,
    title: 'EVS: The Water Cycle Explained',
    content: 'The water cycle consists of four main stages: Evaporation (liquid to gas), Condensation (gas to liquid, forming clouds), Precipitation (rain, snow), and Collection (in rivers, lakes).',
    timestamp: '4 days ago',
    tags: ['Class 5', 'EVS', 'Diagram']
  },
  {
    id: 4,
    title: 'History: Indus Valley Civilization Key Points',
    content: 'Major cities: Harappa and Mohenjo-Daro. Known for its advanced urban planning, standardized weights, and impressive drainage system. Decline reasons are still debated.',
    timestamp: '1 week ago',
    tags: ['Class 6', 'History']
  },
  {
    id: 5,
    title: 'Science: Acids, Bases, and Salts',
    content: 'Acids are sour, turn blue litmus red. Bases are bitter, turn red litmus blue. A salt is formed when an acid and a base react. pH scale measures acidity.',
    timestamp: '1 week ago',
    tags: ['Class 7', 'Science', 'Chemistry']
  },
  {
    id: 6,
    title: 'Maths: Squares and Square Roots',
    content: 'The square of a number is the number multiplied by itself (e.g., 5x5=25). The square root is the inverse operation. Important to memorize squares up to 20.',
    timestamp: '2 weeks ago',
    tags: ['Class 8', 'Maths', 'Formula']
  },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddNote = () => {
    if (newNoteTitle.trim() && newNoteContent.trim()) {
      const newNote: Note = {
        id: Date.now(),
        title: newNoteTitle,
        content: newNoteContent,
        timestamp: 'Just now',
        tags: ['New']
      };
      setNotes([newNote, ...notes]);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };
  
  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
  }
  
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );


  return (
    <div className="flex h-full flex-col">
      <AppHeader title="My Notes" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Create a New Note</CardTitle>
            <CardDescription>
              Jot down important points, formulas, and concepts from your lessons. Your notes are saved automatically.
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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h2 className="font-headline text-2xl font-semibold">Your Saved Notes</h2>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search notes..."
                className="pl-8 sm:w-[300px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          {filteredNotes.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredNotes.map((note) => (
                <Card key={note.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                        <CardTitle className="font-headline text-lg">{note.title}</CardTitle>
                         <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleDeleteNote(note.id)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete note</span>
                        </Button>
                    </div>
                    <CardDescription>{note.timestamp}</CardDescription>
                     <div className="flex flex-wrap gap-1 pt-2">
                      {note.tags.map(tag => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{tag}</span>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-4">{note.content}</p>
                  </CardContent>
                   <CardFooter>
                    <Button variant="outline" className="w-full">
                        <Download className="mr-2 h-4 w-4" />
                        Download Note
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
             <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-48 border rounded-lg">
                <p className="font-semibold">No notes found.</p>
                <p className="text-sm mt-1">Try a different search term or create a new note.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
