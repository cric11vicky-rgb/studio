
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
import { useAuth } from '@/context/auth-context';

// Mock OTP for demonstration. In a real app, this would be generated and sent via a service.
const MOCK_OTP = '123456';

export default function AdminForgotPasswordPage() {
  const [step, setStep] = useState(1); // 1: Username, 2: Verify OTP, 3: Reset Password
  const [username, setUsername] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();
  const { adminUser, updateAdminCredentials } = useAuth();

  const handleUsernameSubmit = () => {
    if (username.toLowerCase() === 'admin') {
      setError('');
      setSuccess(`An OTP has been sent to the admin's registered mobile number.`);
      setStep(2);
    } else {
      setError('Invalid username. Only the admin can use this page.');
    }
  };
  
  const handleVerification = () => {
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
    updateAdminCredentials({ password: newPassword });
    setSuccess('Admin password has been reset successfully! Redirecting to login...');
    setError('');
    setTimeout(() => router.push('/login'), 2000);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">
            Admin Password Reset
          </CardTitle>
          <CardDescription>
            {step === 1 && "Enter your admin username to begin."}
            {step === 2 && "Enter the OTP sent to your registered mobile number."}
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
                  placeholder="Enter 'admin'"
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
              onSubmit={(e) => { e.preventDefault(); handleVerification(); }}
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
               <Button variant="link" size="sm" className="w-full" onClick={() => setStep(1)}>Back</Button>
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
                <Link href="/login" passHref>
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
