
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
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/auth-context';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ManageAdminPage() {
  const { user, adminUser, updateAdminCredentials } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [password, setPassword] = React.useState('');
  const [mobileNumber, setMobileNumber] = React.useState('');

  React.useEffect(() => {
    if (adminUser) {
      setMobileNumber(adminUser.mobileNumber || '');
      setPassword(adminUser.password || '');
    }
  }, [adminUser]);

  // Protect the route for admin only
  React.useEffect(() => {
      if(user?.role !== 'admin') {
          router.push('/teacher-dashboard');
      }
  }, [user, router]);


  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !mobileNumber) {
      toast({ variant: 'destructive', title: 'Error', description: 'Please fill all fields.' });
      return;
    }
    updateAdminCredentials({ password, mobileNumber });
    toast({ title: 'Success', description: 'Admin details updated successfully.' });
  };

  if (user?.role !== 'admin') {
      return null;
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <header>
        <h2 className="text-3xl font-bold tracking-tight">Manage Admin Account</h2>
        <p className="text-muted-foreground">
          Update the password and registered mobile number for the admin account.
        </p>
      </header>

      <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle>Update Admin Credentials</CardTitle>
            <CardDescription>
              This will update the login details for the 'admin' user.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleUpdate} className="space-y-6">
               <div className="space-y-2">
                <Label htmlFor="password">Admin Password</Label>
                <Input id="password" type="password" placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Admin Mobile Number</Label>
                <Input id="mobile" placeholder="Enter new mobile number" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
              </div>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
    </div>
  );
}
