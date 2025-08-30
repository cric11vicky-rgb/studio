
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
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';

// Mock OTP for demonstration. In a real app, this would be generated and sent via a service.
const MOCK_OTP = '123456';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Enter username, 2: OTP, 3: Reset password
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleUsernameSubmit = () => {
    const studentUsers = JSON.parse(localStorage.getItem('studentUsers') || '{}');
    const userData = studentUsers[username.toLowerCase()];
    if (userData) {
      setError('');
      // In a real app, you would trigger an API call to send the OTP here.
      setSuccess(`An OTP has been sent to the registered mobile number.`);
      setStep(2);
    } else {
      setError('Username not found.');
    }
  };
  
  const handleOtpVerification = () => {
      setError('');
      if (otp === MOCK_OTP) {
          setSuccess('OTP verified successfully! Please set your new password.');
          setStep(3);
      } else {
          setError('Invalid OTP. Please try again.');
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
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
            Reset Your Password
          </CardTitle>
          <CardDescription>
            {step === 1 && "Enter your username to receive an OTP."}
            {step === 2 && "Enter the OTP sent to your mobile."}
            {step === 3 && "Set your new password."}
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
                Send OTP
              </Button>
            </form>
          )}

          {step === 2 && (
            <form
              onSubmit={(e) => { e.preventDefault(); handleOtpVerification(); }}
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
                Verify OTP
              </Button>
               <Button variant="link" size="sm" className="w-full" onClick={() => setStep(1)}>Back to username</Button>
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
