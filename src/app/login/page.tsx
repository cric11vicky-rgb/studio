
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

// Mock OTP for demonstration. In a real app, this would be generated and sent via a service.
const MOCK_OTP = '123456';

export default function LoginPage() {
  const [step, setStep] = useState(1); // 1: Enter credentials, 2: Enter OTP
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login } = useAuth();
  const router = useRouter();


  const handlePrimarySubmit = () => {
    setError('');
    setSuccess('');

    if (username.toLowerCase() === 'admin') {
      // In a real app, trigger OTP sending here
      setSuccess(`An OTP has been sent to the admin's registered mobile number.`);
      setStep(2);
      return;
    }

    // For teachers, proceed with password login
    const user = login(username, password);
    if (user) {
        if (user.role === 'teacher' || user.role === 'admin') {
            router.push('/teacher-dashboard');
        } else {
            router.push('/dashboard'); // Fallback
        }
    } else {
        setError('Invalid username or password.');
    }
  }

  const handleOtpLogin = () => {
    setError('');
    setSuccess('');

    if (otp === MOCK_OTP) {
        // Use a special value for password to indicate OTP login
        const user = login(username, 'otp-verified');
         if (user) {
            setSuccess('Login successful! Redirecting...');
            router.push('/teacher-dashboard');
        } else {
            // This case should ideally not happen if username is 'admin'
            setError('An unknown error occurred during login.');
        }
    } else {
        setError('Invalid OTP. Please try again.');
    }
  };


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
            {step === 1 && "Enter your username and password to continue."}
            {step === 2 && "Enter the OTP sent to the admin's mobile number."}
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
                onSubmit={(e) => { e.preventDefault(); handlePrimarySubmit(); }}
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
                
                {username.toLowerCase() !== 'admin' && (
                 <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/admin/forgot-password" passHref>
                            <span className="text-sm text-primary hover:underline cursor-pointer">
                                Forgot password?
                            </span>
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                )}

                <Button type="submit" className="w-full">
                    {username.toLowerCase() === 'admin' ? 'Send OTP' : 'Log In'}
                </Button>
            </form>
           )}

            {step === 2 && (
                 <form
                    onSubmit={(e) => { e.preventDefault(); handleOtpLogin(); }}
                    className="space-y-4"
                >
                    <div className="space-y-2">
                        <Label htmlFor="otp">Enter OTP</Label>
                        <Input
                            id="otp"
                            placeholder="Enter the 6-digit code"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Log In with OTP
                    </Button>
                    <Button variant="link" size="sm" className="w-full" onClick={() => { setStep(1); setError(''); setSuccess(''); }}>
                        Back to username
                    </Button>
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
