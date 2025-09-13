
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
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, UserPlus, FileDown } from 'lucide-react';
import { useAuth } from '@/context/auth-context';

const students = [
  { id: 1, name: 'Aarav Sharma', class: '10', email: 'aarav.s@example.com', joinDate: '2023-01-15', avatar: 'https://picsum.photos/100?student=1' },
  { id: 2, name: 'Riya Gupta', class: '9', email: 'riya.g@example.com', joinDate: '2023-02-20', avatar: 'https://picsum.photos/100?student=2' },
  { id: 3, name: 'Karan Patel', class: '10', email: 'karan.p@example.com', joinDate: '2023-01-18', avatar: 'https://picsum.photos/100?student=3' },
  { id: 4, name: 'Sneha Reddy', class: '8', email: 'sneha.r@example.com', joinDate: '2023-03-10', avatar: 'https://picsum.photos/100?student=4' },
  { id: 5, name: 'Vikram Singh', class: '7', email: 'vikram.s@example.com', joinDate: '2023-04-05', avatar: 'https://picsum.photos/100?student=5' },
  { id: 6, name: 'Isha Verma', class: '11', stream: 'Science', email: 'isha.v@example.com', joinDate: '2023-04-12', avatar: 'https://picsum.photos/100?student=6' },
  { id: 7, name: 'Rohan Mehra', class: '12', stream: 'Commerce', email: 'rohan.m@example.com', joinDate: '2023-04-15', avatar: 'https://picsum.photos/100?student=7' },
];

export default function StudentsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [classFilter, setClassFilter] = React.useState('All');

  const filteredStudents = students.filter(student => {
      const nameMatch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const classMatch = classFilter === 'All' || student.class === classFilter;
      return nameMatch && classMatch;
  })

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Manage Students</h2>
        <p className="text-muted-foreground">
          View student profiles and manage their enrollment.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Student Roster</CardTitle>
          <CardDescription>
            A list of all students enrolled in your classes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"/>
                <Input
                    type="search"
                    placeholder="Search students..."
                    className="pl-8 w-full md:w-[300px]"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="flex gap-2">
                <Select value={classFilter} onValueChange={setClassFilter}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Filter by class" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="All">All Classes</SelectItem>
                        {[...Array(10)].map((_, i) => (
                            <SelectItem key={i+3} value={`${i + 3}`}>{`Class ${i + 3}`}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button>
                    <UserPlus className="mr-2 h-4 w-4" /> Add Student
                </Button>
                <Button variant="outline">
                    <FileDown className="mr-2 h-4 w-4" /> Export
                </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Joining Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {student.name}
                  </TableCell>
                  <TableCell>Class {student.class}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">View Profile</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
           {filteredStudents.length === 0 && (
              <div className="text-center p-8 text-muted-foreground">
                  No students found for the selected filters.
              </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
