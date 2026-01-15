
'use client';

import * as React from 'react';
import { useAuth } from '@/context/auth-context';
import { AppHeader } from '@/app/(app)/layout';
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
import { KeyRound, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const { user, changeStudentPassword } = useAuth();
  const { toast } = useToast();

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({ variant: 'destructive', title: 'Error', description: 'New passwords do not match.' });
      return;
    }
    if (!user) return;

    const success = changeStudentPassword(user.username, currentPassword, newPassword);

    if (success) {
      toast({ title: 'Success', description: 'Your password has been changed successfully.' });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      toast({ variant: 'destructive', title: 'Error', description: 'Incorrect current password.' });
    }
  };

  return (
    <div className="flex h-full flex-col">
      <AppHeader title="Settings" />
      <main className="flex-1 space-y-6 p-4 md:p-8">
        <Card className="mx-auto max-w-2xl">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your account security settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div className="space-y-4 rounded-lg border p-4">
                 <div className='flex items-center gap-2'>
                    <KeyRound className='text-primary' />
                    <h3 className="font-semibold">Change Password</h3>
                 </div>
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required/>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                </div>
              </div>
              <Button type="submit">
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
