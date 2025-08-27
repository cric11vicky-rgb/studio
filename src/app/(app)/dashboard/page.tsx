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
  ClipboardList,
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
import { useLanguage } from '@/context/language-context';

const menuItems = [
  { href: '/books', label: 'Digital Books', labelHi: 'डिजिटल किताबें', icon: Book },
  { href: '/solutions', label: 'Solutions', labelHi: 'समाधान', icon: FileText },
  { href: '/classes', label: 'Recorded Classes', labelHi: 'रिकॉर्डेड कक्षाएं', icon: Video },
  { href: '/live-class', label: 'Live Classes', labelHi: 'लाइव कक्षाएं', icon: Tv },
  { href: '/notes', label: 'Notes', labelHi: 'नोट्स', icon: StickyNote },
  { href: '/doubts', label: 'Doubt Section', labelHi: 'संदेह अनुभाग', icon: HelpCircle },
  { href: '/generate-paper', label: 'AI Paper Generator', labelHi: 'एआई पेपर जेनरेटर', icon: Sparkles },
  { href: '/tests', label: 'Tests', labelHi: 'टेस्ट', icon: ClipboardList },
  { href: '/contact', label: 'Help & Contact', labelHi: 'सहायता और संपर्क', icon: Mail },
];

export default function DashboardPage() {
  const { language } = useLanguage();
  return (
    <div className="flex h-full flex-col bg-background">
      <AppHeader title="Dashboard" />
      <main className="flex-1 space-y-6 p-4 md:p-8 pt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {menuItems.map((item) => (
            <Link href={item.href} key={item.href}>
              <Card className="aspect-square flex flex-col items-center justify-center p-4 text-center hover:bg-secondary hover:border-primary transition-colors">
                <item.icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle className="text-sm font-medium">
                  {language === 'English' ? item.label : item.labelHi}
                </CardTitle>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
