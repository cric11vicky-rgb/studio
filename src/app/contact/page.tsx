
'use client';

import { Mail, Phone, MessageSquare, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { Logo } from '@/components/logo';

export function ContactHeader() {
    return (
     <header className="flex h-16 items-center justify-between border-b bg-card px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
            <Logo />
            <span className="font-headline text-xl font-semibold">Smart Vidya</span>
        </Link>
        <Button asChild>
            <Link href="/student/login">
                Back to Login
            </Link>
        </Button>
    </header>
    )
}


export default function ContactPage() {
  return (
    <div className="flex h-full min-h-screen flex-col bg-secondary">
      <ContactHeader/>
      <main className="flex-1 p-4 md:p-8">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
          <div>
            <h2 className="font-headline text-3xl font-bold">Get in Touch</h2>
            <p className="mt-2 text-muted-foreground">
              Have questions or need support? Fill out the form, and our team
              will get back to you shortly.
            </p>
            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-muted-foreground">
                    <a
                      href="mailto:support@smartvidya.com"
                      className="hover:underline"
                    >
                      support@smartvidya.com
                    </a>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-muted-foreground">+91 1800 123 4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Live Chat</h3>
                  <p className="text-muted-foreground">
                    Available Mon-Fri, 9am - 6pm IST
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Send a Message</CardTitle>
              <CardDescription>
                We're here to help with any questions you may have.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="What is your message about?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Please describe your issue or question."
                    className="min-h-[120px]"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
