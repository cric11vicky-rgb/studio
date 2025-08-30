
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserPlus, Trash2 } from 'lucide-react';
import { useAuth, TeacherUser } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

export default function TeachersPage() {
  const { addTeacher, getTeachers } = useAuth();
  const { toast } = useToast();
  
  const [teachers, setTeachers] = React.useState<TeacherUser[]>([]);
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');

  React.useEffect(() => {
    setTeachers(getTeachers());
  }, [getTeachers]);

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !username || !password || !mobileNumber) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please fill all fields.' });
      return;
    }
    const success = addTeacher({ name, username, password, mobileNumber, role: 'teacher' });
    if (success) {
      toast({ title: 'Success', description: 'Teacher added successfully.' });
      setTeachers(getTeachers());
      // Reset form
      setName('');
      setUsername('');
      setPassword('');
      setMobileNumber('');
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Username already exists.' });
    }
  };
  
  // Note: Deleting teachers is not implemented in this prototype as it requires more complex state management.

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Manage Teachers</h2>
        <p className="text-muted-foreground">
          Add, view, and manage teacher accounts.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Add New Teacher</CardTitle>
            <CardDescription>
              Create a new teacher account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddTeacher} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" value={name} onChange={e => setName(e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number</Label>
                <Input id="mobile" placeholder="For OTP verification" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Teacher
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Teacher Roster</CardTitle>
            <CardDescription>
              A list of all teachers in the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Teacher</TableHead>
                  <TableHead>Username</TableHead>
                  <TableHead>Mobile Number</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachers.length > 0 ? (
                  teachers.map((teacher) => (
                    <TableRow key={teacher.username}>
                      <TableCell className="font-medium flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={`https://picsum.photos/100?teacher=${teacher.username}`} alt={teacher.name} />
                          <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        {teacher.name}
                      </TableCell>
                      <TableCell>{teacher.username}</TableCell>
                      <TableCell>{teacher.mobileNumber}</TableCell>
                      <TableCell className="text-right">
                         <Button variant="ghost" size="icon" disabled>
                           <Trash2 className="h-4 w-4" />
                         </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      No teachers added yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
