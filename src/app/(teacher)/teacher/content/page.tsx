
'use client';

import React, { useState, useEffect } from 'react';
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
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Upload, FileText, Trash2, Download } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

// Define the Book type
export type Book = {
  id: string;
  title: string;
  subject: string;
  class: string;
  board: string;
  medium: string;
  fileName?: string;
  uploadDate: string;
  imageUrl: string;
  aiHint: string;
};

export default function ContentPage() {
  const { toast } = useToast();

  // Form state
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [bookClass, setBookClass] = useState('');
  const [board, setBoard] = useState('');
  const [medium, setMedium] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // Books list state
  const [uploadedBooks, setUploadedBooks] = useState<Book[]>([]);

  useEffect(() => {
    const storedBooks = localStorage.getItem('uploadedBooks');
    if (storedBooks) {
      setUploadedBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('uploadedBooks', JSON.stringify(uploadedBooks));
  }, [uploadedBooks]);


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type === 'application/pdf') {
        setFile(selectedFile);
      } else {
        toast({
          variant: 'destructive',
          title: 'Invalid File Type',
          description: 'Please upload a PDF file.',
        });
        e.target.value = '';
      }
    }
  };

  const handleAddBook = () => {
    if (!title || !subject || !bookClass || !board || !medium || !file) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill out all fields and select a PDF file.',
      });
      return;
    }

    const newBook: Book = {
      id: `${Date.now()}`,
      title,
      subject,
      class: bookClass,
      board,
      medium,
      fileName: file.name,
      uploadDate: new Date().toLocaleDateString(),
      imageUrl: `https://picsum.photos/seed/${Math.random()}/300/400`,
      aiHint: `${subject.toLowerCase()} textbook`,
    };

    setUploadedBooks(prev => [newBook, ...prev]);

    // Reset form
    setTitle('');
    setSubject('');
    setBookClass('');
    setBoard('');
    setMedium('');
    setFile(null);
    // This is tricky, but we can reset the file input by keying it
    document.getElementById('file-upload')!.value = '';


    toast({
      title: 'Book Uploaded',
      description: `${title} has been added to the library.`,
    });
  };
  
  const handleDeleteBook = (id: string) => {
      setUploadedBooks(uploadedBooks.filter(book => book.id !== id));
       toast({
          title: 'Book Deleted',
          description: `The book has been removed from the library.`,
        });
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Manage Book PDFs</h2>
        <p className="text-muted-foreground">
          Upload, view, and manage all your teaching materials.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Book PDF</CardTitle>
          <CardDescription>
            Fill in the details and upload the PDF file for the book.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Book Title</Label>
              <Input id="title" placeholder="e.g., NCERT Science" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="e.g., Science" value={subject} onChange={(e) => setSubject(e.target.value)} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="class">Class</Label>
              <Select value={bookClass} onValueChange={setBookClass}>
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
              <Label htmlFor="board">Board</Label>
               <Select value={board} onValueChange={setBoard}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Board" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CBSE">CBSE</SelectItem>
                  <SelectItem value="RBSE">RBSE</SelectItem>
                  <SelectItem value="NCERT">NCERT</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
              <Label htmlFor="medium">Medium</Label>
              <Select value={medium} onValueChange={setMedium}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 lg:col-span-3">
               <Label htmlFor="file-upload">Book PDF</Label>
              <Input id="file-upload" type="file" accept=".pdf" onChange={handleFileUpload} />
            </div>
            <div className="lg:col-span-3">
              <Button onClick={handleAddBook}>
                <Upload className="mr-2 h-4 w-4" />
                Upload Book
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Books</CardTitle>
          <CardDescription>
            Here is a list of all book PDFs you have uploaded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Board</TableHead>
                <TableHead>Medium</TableHead>
                <TableHead>File Name</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedBooks.length > 0 ? (
                uploadedBooks.map((book) => (
                  <TableRow key={book.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{book.title}</span>
                    </TableCell>
                    <TableCell>Class {book.class}</TableCell>
                    <TableCell>{book.subject}</TableCell>
                    <TableCell>{book.board}</TableCell>
                    <TableCell>{book.medium}</TableCell>
                    <TableCell>{book.fileName}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => alert('Download functionality not implemented.')}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteBook(book.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
               ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No books uploaded yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
