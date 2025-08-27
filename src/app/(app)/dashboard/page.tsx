'use client';

import * as React from 'react';
import {
  Book,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Sparkles,
  StickyNote,
  Tv,
  Video,
} from 'lucide-react';
import { AppHeader } from '@/app/(app)/layout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const menuItems = [
  { href: '/books', label: 'Digital Books', icon: Book },
  { href: '/solutions', label: 'Solutions', icon: FileText },
  { href: '/classes', label: 'Recorded Classes', icon: Video },
  { href: '/live-class', label: 'Live Classes', icon: Tv },
  { href: '/notes', label: 'Notes', icon: StickyNote },
  { href: '/doubts', label: 'Doubt Section', icon: HelpCircle },
  { href: '/generate-paper', label: 'AI Paper Generator', icon: Sparkles },
  { href: '/contact', label: 'Help & Contact', icon: Mail },
];

export default function DashboardPage() {
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader title="Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <Card className="aspect-square flex flex-col items-center justify-center p-4 text-center hover:bg-secondary hover:border-primary transition-colors">
                <item.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-sm font-medium">{item.label}</CardTitle>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
