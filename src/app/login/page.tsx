
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
import { AlertCircle, ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const MOCK_OTP = '123456';

export default function LoginPage() {
  const [step, setStep] = useState(1); // 1: Credentials, 2: OTP
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleCredentialsSubmit = () => {
    setError('');
    const userExists = login(username, password, false);
    if (userExists) {
        setSuccess('Credentials verified. An OTP has been sent to your registered mobile number.');
        setStep(2);
    } else {
        setError('Invalid username or password. For student access, please use the student login.');
    }
  };

  const handleOtpVerification = () => {
    setError('');
    if (otp === MOCK_OTP) {
        const user = login(username, password, true);
        if (user) {
            if (user.role === 'teacher' || user.role === 'admin') {
                router.push('/teacher-dashboard');
            } else {
                router.push('/dashboard');
            }
        }
    } else {
        setError('Invalid OTP. Please try again.');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">
            Admin & Teacher Login
          </CardTitle>
          <CardDescription>
            {step === 1 && "Welcome to the EduVerse Portal."}
            {step === 2 && "Please enter the OTP to continue."}
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
          {success && step === 2 && (
              <Alert variant="default" className="bg-green-100 border-green-400 text-green-800 mb-4">
                <CheckCircle className="h-4 w-4 text-green-800" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          {step === 1 && (
            <form
                onSubmit={(e) => {
                e.preventDefault();
                handleCredentialsSubmit();
                }}
                className="space-y-4"
            >
                <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                    id="username"
                    placeholder="Enter admin or teacher username"
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
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                </div>
                <Button type="submit" className="w-full">
                    Verify & Send OTP
                </Button>
            </form>
          )}
          {step === 2 && (
             <form
                onSubmit={(e) => {
                e.preventDefault();
                handleOtpVerification();
                }}
                className="space-y-4"
            >
                <div className="space-y-2">
                <Label htmlFor="otp">Enter OTP</Label>
                <Input
                    id="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                />
                </div>
                 <Button type="submit" className="w-full">
                    Log In
                </Button>
                <Button variant="link" size="sm" className="w-full" onClick={() => { setStep(1); setError(''); setSuccess(''); }}>Back to login</Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="justify-center">
             <Button asChild variant="outline">
                <Link href="/student/login">
                    <ArrowLeft className="mr-2"/>
                    Back to Student Login
                </Link>
            </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
