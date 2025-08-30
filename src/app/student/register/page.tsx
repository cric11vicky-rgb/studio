
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
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';
import Link from 'next/link';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Mock OTP for demonstration. In a real app, this would be generated and sent via a service.
const MOCK_OTP = '123456';

export default function StudentRegisterPage() {
  const [step, setStep] = useState(1); // 1: Details, 2: OTP, 3: Password/Security
  
  // User data state
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [securityQuestion, setSecurityQuestion] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleDetailsSubmit = () => {
    setError('');
    if (!name || !username || !mobileNumber || !dob || !studentClass) {
      setError('Please fill out all personal details.');
      return;
    }
    const studentUsers = JSON.parse(localStorage.getItem('studentUsers') || '{}');
    if (studentUsers[username.toLowerCase()]) {
      setError('Username already exists. Please choose another one.');
      return;
    }
    
    // In a real app, you would trigger an API call to send the OTP here.
    setSuccess(`An OTP has been sent to ${mobileNumber}. Please check your messages.`);
    setStep(2);
  };
  
  const handleOtpVerification = () => {
      setError('');
      if (otp === MOCK_OTP) {
          setSuccess('OTP verified successfully! Please set your password.');
          setStep(3);
      } else {
          setError('Invalid OTP. Please try again.');
      }
  };

  const handleFinalRegister = () => {
    setError('');
    if (!password || !securityQuestion || !securityAnswer) {
      setError('Please set a password and choose a security question.');
      return;
    }

    const studentUsers = JSON.parse(localStorage.getItem('studentUsers') || '{}');

    studentUsers[username.toLowerCase()] = {
      name,
      password,
      mobileNumber,
      dob,
      class: studentClass,
      securityQuestion,
      securityAnswer: securityAnswer.toLowerCase(),
    };

    localStorage.setItem('studentUsers', JSON.stringify(studentUsers));
    localStorage.setItem('selectedClass', studentClass); // Set class preference
    setSuccess('Registration successful! You will be redirected to the login page.');
    
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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">
            Create Your Student Account
          </CardTitle>
           <CardDescription>
            {step === 1 && "Step 1: Enter your personal details."}
            {step === 2 && "Step 2: Verify your mobile number."}
            {step === 3 && "Step 3: Secure your account."}
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
                onSubmit={(e) => { e.preventDefault(); handleDetailsSubmit(); }}
                className="space-y-4"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Choose a username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mobileNumber">Mobile Number</Label>
                    <Input id="mobileNumber" type="tel" placeholder="Enter your mobile number" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} required />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="class">Class</Label>
                    <Select value={studentClass} onValueChange={setStudentClass}>
                        <SelectTrigger id="class">
                            <SelectValue placeholder="Select your class" />
                        </SelectTrigger>
                        <SelectContent>
                            {[...Array(8)].map((_, i) => (
                                <SelectItem key={i+3} value={`${i + 3}`}>{`Class ${i + 3}`}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                </div>
                <Button type="submit" className="w-full">Send OTP</Button>
            </form>
          )}

          {step === 2 && (
             <form
                onSubmit={(e) => { e.preventDefault(); handleOtpVerification(); }}
                className="space-y-4"
            >
                <div className="space-y-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input id="otp" placeholder="6-digit code" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Verify OTP</Button>
                 <Button variant="link" size="sm" className="w-full" onClick={() => setStep(1)}>Back to details</Button>
            </form>
          )}

          {step === 3 && (
             <form
                onSubmit={(e) => { e.preventDefault(); handleFinalRegister(); }}
                className="space-y-4"
            >
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Create a strong password" value={password} onChange={(e) => setPassword(e.target.value)} required />
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
                    <Input id="securityAnswer" placeholder="Your answer (case-insensitive)" value={securityAnswer} onChange={(e) => setSecurityAnswer(e.target.value)} required />
                </div>
                <Button type="submit" className="w-full">Complete Registration</Button>
            </form>
          )}

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
