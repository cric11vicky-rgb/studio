'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Book,
  ClipboardList,
  FileText,
  HelpCircle,
  LayoutDashboard,
  Mail,
  Menu,
  MoreHorizontal,
  Settings,
  Sparkles,
  StickyNote,
  User,
  Video,
  Tv,
  Globe,
  TrendingUp,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { cn } from '@/lib/utils';
import { LanguageProvider, useLanguage } from '@/context/language-context';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', labelHi: 'डैशबोर्ड', icon: LayoutDashboard },
  { href: '/books', label: 'Books', labelHi: 'किताबें', icon: Book },
  { href: '/live-class', label: 'Live Classes', labelHi: 'लाइव कक्षाएं', icon: Tv },
  { href: '/notes', label: 'Notes', labelHi: 'नोट्स', icon: StickyNote },
  { href: '/tests', label: 'Tests', labelHi: 'टेस्ट', icon: ClipboardList },
  { href: '/doubts', label: 'Doubts', labelHi: 'संदेह', icon: HelpCircle },
  { href: '/progress', label: 'Progress', labelHi: 'प्रगति', icon: TrendingUp },
  { href: '/contact', label: 'Help', labelHi: 'सहायता', icon: Mail },
];

function AppLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { language } = useLanguage();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <span className="font-headline text-xl font-semibold">EduVerse</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
                    tooltip={language === 'English' ? item.label : item.labelHi}
                  >
                    <item.icon />
                    <span>{language === 'English' ? item.label : item.labelHi}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center justify-between p-2">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src="https://picsum.photos/100" alt="User" data-ai-hint="student avatar" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{language === 'English' ? 'Student' : 'विद्यार्थी'}</span>
                <span className="text-muted-foreground">student@edu.com</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2">
                <DropdownMenuLabel>{language === 'English' ? 'My Account' : 'मेरा खाता'}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>{language === 'English' ? 'Profile' : 'प्रोफ़ाइल'}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{language === 'English' ? 'Settings' : 'सेटिंग्स'}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>{language === 'English' ? 'Log out' : 'लॉग आउट'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <AppLayoutContent>{children}</AppLayoutContent>
    </LanguageProvider>
  );
}


export function AppHeader({ title }: { title: string }) {
  const { isMobile } = useSidebar();
  const { language, setLanguage, getTranslation } = useLanguage();

  // Hide the default header on the dashboard page
  const pathname = usePathname();
  if (pathname === '/dashboard') {
    return null;
  }
  
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6">
      <SidebarTrigger className={cn('md:hidden', { hidden: !isMobile })}>
        <Menu />
      </SidebarTrigger>
      <h1 className="font-headline text-lg font-semibold md:text-xl flex-1">{getTranslation(title)}</h1>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Globe className="mr-2 h-4 w-4" />
            <span>{language}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onSelect={() => setLanguage('English')}>
            English
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setLanguage('हिन्दी')}>
            हिन्दी
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
