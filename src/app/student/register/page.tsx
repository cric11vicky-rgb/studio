
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function StudentRegisterPage() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegister = () => {
    if (!name || !username || !password || !securityQuestion || !securityAnswer) {
      setError('All fields are required.');
      return;
    }

    const studentUsers = JSON.parse(localStorage.getItem('studentUsers') || '{}');

    if (studentUsers[username.toLowerCase()]) {
      setError('Username already exists. Please choose another one.');
      return;
    }

    studentUsers[username.toLowerCase()] = {
      name,
      password,
      securityQuestion,
      securityAnswer: securityAnswer.toLowerCase(),
    };

    localStorage.setItem('studentUsers', JSON.stringify(studentUsers));
    setSuccess('Registration successful! You can now log in.');
    setError('');
    setTimeout(() => router.push('/student/login'), 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">
            Create Your Student Account
          </CardTitle>
          <CardDescription>
            Join EduVerse to start your learning journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityQuestion">Security Question</Label>
               <Select value={securityQuestion} onValueChange={setSecurityQuestion}>
                  <SelectTrigger id="securityQuestion">
                    <SelectValue placeholder="Select a security question" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pet">What is the name of your first pet?</SelectItem>
                    <SelectItem value="birthplace">What is your city of birth?</SelectItem>
                    <SelectItem value="mother_maiden">What is your mother's maiden name?</SelectItem>
                    <SelectItem value="favorite_book">What is your favorite book?</SelectItem>
                  </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="securityAnswer">Security Answer</Label>
              <Input
                id="securityAnswer"
                placeholder="Your answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Registration Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
             {success && (
              <Alert variant="default" className="bg-green-100 border-green-400 text-green-800">
                <CheckCircle className="h-4 w-4 text-green-800" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center text-sm">
             <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link href="/student/login" passHref>
                    <span className="cursor-pointer font-semibold text-primary hover:underline">
                        Login here
                    </span>
                </Link>
            </p>
        </CardFooter>
      </Card>
    </main>
  );
}
