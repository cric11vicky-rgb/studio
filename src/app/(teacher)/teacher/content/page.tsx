
'use client';

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
import { Upload, FileText, Video, Trash2, Download } from 'lucide-react';

const uploadedContent = [
  { id: 1, name: 'Chapter_1_Notes.pdf', type: 'PDF', size: '2.3 MB', date: '2023-10-26', class: '10' },
  { id: 2, name: 'Algebra_Basics_Video.mp4', type: 'Video', size: '45.1 MB', date: '2023-10-25', class: '9' },
  { id: 3, name: 'History_Worksheet.docx', type: 'DOCX', size: '150 KB', date: '2023-10-24', class: '8' },
  { id: 4, name: 'Science_Diagram.png', type: 'Image', size: '800 KB', date: '2023-10-22', class: '7' },
];

export default function ContentPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Manage Content</h2>
        <p className="text-muted-foreground">
          Upload, view, and manage all your teaching materials.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Upload New Material</CardTitle>
          <CardDescription>
            You can upload documents, presentations, videos, or images.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Input type="file" className="flex-1" />
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Uploaded Content</CardTitle>
          <CardDescription>
            Here is a list of all materials you have uploaded.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Date Uploaded</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {uploadedContent.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    {item.type === 'Video' ? <Video className="h-4 w-4 text-muted-foreground" /> : <FileText className="h-4 w-4 text-muted-foreground" />}
                    <span>{item.name}</span>
                  </TableCell>
                  <TableCell>Class {item.class}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.size}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
