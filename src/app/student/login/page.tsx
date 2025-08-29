
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, HelpCircle, UserCog } from 'lucide-react';
import Link from 'next/link';

export default function StudentLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { studentLogin } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    const user = studentLogin(username, password);
    if (user) {
      router.push('/dashboard');
    } else {
      setError('Invalid username or password. Please try again.');
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <div className="absolute top-4 left-4">
         <Button variant="outline" size="icon" asChild>
            <Link href="/login">
                <UserCog/>
                 <span className="sr-only">Admin/Teacher Login</span>
            </Link>
        </Button>
      </div>
      <div className="absolute top-4 right-4">
        <Button variant="outline" asChild>
            <Link href="/contact">
                <HelpCircle className="mr-2"/>
                Help & Support
            </Link>
        </Button>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">
            Student Login
          </CardTitle>
          <CardDescription>
            Enter your credentials to access your learning portal.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Login Failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <Button type="submit" className="w-full">
              Log In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-4 text-sm">
          <Link href="/student/forgot-password" passHref>
             <span className="cursor-pointer text-primary hover:underline">
              Forgot your password?
             </span>
          </Link>
           <p className="text-muted-foreground">
            {"Don't have an account?"}{" "}
            <Link href="/student/register" passHref>
                <span className="cursor-pointer font-semibold text-primary hover:underline">
                    Register here
                </span>
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
