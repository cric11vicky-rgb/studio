
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
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Enter username, 2: Answer question, 3: Reset password
  const [username, setUsername] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleUsernameSubmit = () => {
    const studentUsers = JSON.parse(localStorage.getItem('studentUsers') || '{}');
    const userData = studentUsers[username.toLowerCase()];
    if (userData) {
      setSecurityQuestion(userData.securityQuestion);
      setStep(2);
      setError('');
    } else {
      setError('Username not found.');
    }
  };

  const handleAnswerSubmit = () => {
    const studentUsers = JSON.parse(localStorage.getItem('studentUsers') || '{}');
    const userData = studentUsers[username.toLowerCase()];
    if (userData && userData.securityAnswer === securityAnswer.toLowerCase()) {
      setStep(3);
      setError('');
    } else {
      setError('Incorrect answer. Please try again.');
    }
  };

  const handlePasswordReset = () => {
    if (!newPassword) {
        setError('Password cannot be empty.');
        return;
    }
    const studentUsers = JSON.parse(localStorage.getItem('studentUsers') || '{}');
    studentUsers[username.toLowerCase()].password = newPassword;
    localStorage.setItem('studentUsers', JSON.stringify(studentUsers));
    setSuccess('Password has been reset successfully! Redirecting to login...');
    setError('');
    setTimeout(() => router.push('/student/login'), 2000);
  };
  
  const getQuestionText = (key: string) => {
    const questions: Record<string, string> = {
        "pet": "What is the name of your first pet?",
        "birthplace": "What is your city of birth?",
        "mother_maiden": "What is your mother's maiden name?",
        "favorite_book": "What is your favorite book?"
    };
    return questions[key] || "Your security question";
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">
            Reset Your Password
          </CardTitle>
          <CardDescription>
            Follow the steps to regain access to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
             <Alert variant="default" className="bg-green-100 border-green-400 text-green-800 mb-4">
                <CheckCircle className="h-4 w-4 text-green-800" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {step === 1 && (
            <form
              onSubmit={(e) => { e.preventDefault(); handleUsernameSubmit(); }}
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
              <Button type="submit" className="w-full">
                Next
              </Button>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={(e) => { e.preventDefault(); handleAnswerSubmit(); }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="securityAnswer">{getQuestionText(securityQuestion)}</Label>
                <Input
                  id="securityAnswer"
                  placeholder="Enter your answer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Verify Answer
              </Button>
            </form>
          )}

          {step === 3 && (
            <form
              onSubmit={(e) => { e.preventDefault(); handlePasswordReset(); }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Enter your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Reset Password
              </Button>
            </form>
          )}
        </CardContent>
         <CardFooter className="justify-center text-sm">
             <p className="text-muted-foreground">
                Remember your password?{" "}
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
