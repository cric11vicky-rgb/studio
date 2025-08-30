
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
import { AlertCircle, ArrowLeft, CheckCircle, KeyRound, MessageSquareText } from 'lucide-react';
import Link from 'next/link';

const MOCK_OTP = '123456';

type LoginStep = 'username' | 'method_choice' | 'password' | 'otp';

export default function LoginPage() {
  const [step, setStep] = useState<LoginStep>('username');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleUsernameSubmit = () => {
    setError('');
    // Check if user exists without logging them in
    const userExists = login(username, '', false, 'check_user');
    if (userExists) {
        setStep('method_choice');
    } else {
        setError('Invalid username. For student access, please use the student login.');
    }
  };

  const handleMethodSelect = (method: 'password' | 'otp') => {
      setError('');
      setSuccess('');
      if (method === 'otp') {
          setSuccess('An OTP has been sent to your registered mobile number.');
          setStep('otp');
      } else {
          setStep('password');
      }
  }

  const handleLogin = (method: 'password' | 'otp') => {
    setError('');
    const credentials = method === 'password' ? password : otp;
    const user = login(username, credentials, true, method);

    if (user) {
        if (user.role === 'teacher' || user.role === 'admin') {
            router.push('/teacher-dashboard');
        } else {
            router.push('/dashboard'); // Fallback, though should not happen for this login
        }
    } else {
        setError(method === 'password' ? 'Invalid password.' : 'Invalid OTP.');
    }
  }

  const resetFlow = () => {
      setStep('username');
      setPassword('');
      setOtp('');
      setError('');
      setSuccess('');
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
            {step === 'username' && "Enter your username to continue."}
            {step === 'method_choice' && `Welcome, ${username}. Choose your login method.`}
            {step === 'password' && `Enter your password.`}
            {step === 'otp' && `Enter the OTP sent to your mobile.`}
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

          {step === 'username' && (
            <form
                onSubmit={(e) => { e.preventDefault(); handleUsernameSubmit(); }}
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
                <Button type="submit" className="w-full">
                    Next
                </Button>
            </form>
          )}

          {step === 'method_choice' && (
              <div className="space-y-4">
                  <Button className="w-full" onClick={() => handleMethodSelect('password')}>
                      <KeyRound className="mr-2"/>
                      Login with Password
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => handleMethodSelect('otp')}>
                      <MessageSquareText className="mr-2"/>
                      Login with OTP
                  </Button>
                  <Button variant="link" size="sm" className="w-full" onClick={resetFlow}>
                      Back to username
                  </Button>
              </div>
          )}

          {step === 'password' && (
            <form
                onSubmit={(e) => { e.preventDefault(); handleLogin('password'); }}
                className="space-y-4"
            >
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
                    Log In
                </Button>
                <Button variant="link" size="sm" className="w-full" onClick={() => setStep('method_choice')}>Back to method choice</Button>
            </form>
          )}

          {step === 'otp' && (
             <form
                onSubmit={(e) => { e.preventDefault(); handleLogin('otp'); }}
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
                    Verify & Log In
                </Button>
                <Button variant="link" size="sm" className="w-full" onClick={() => setStep('method_choice')}>Back to method choice</Button>
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
