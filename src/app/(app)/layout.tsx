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

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/books', label: 'Digital Books', icon: Book },
  { href: '/solutions', label: 'Solutions', icon: FileText },
  { href: '/classes', label: 'Recorded Classes', icon: Video },
  { href: '/live-class', label: 'Live Classes', icon: Tv },
  { href: '/notes', label: 'Notes', icon: StickyNote },
  { href: '/doubts', label: 'Doubt Section', icon: HelpCircle },
  { href: '/generate-paper', label: 'AI Paper Generator', icon: Sparkles },
  { href: '/tests', label: 'Tests', icon: ClipboardList },
  { href: '/contact', label: 'Help & Contact', icon: Mail },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <item.icon />
                    <span>{item.label}</span>
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
                <span className="font-semibold">Student</span>
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
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <span>Log out</span>
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

export function AppHeader({ title }: { title: string }) {
  const { isMobile } = useSidebar();
  const [language, setLanguage] = React.useState('English');

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:px-6">
      <SidebarTrigger className={cn('md:hidden', { hidden: !isMobile })}>
        <Menu />
      </SidebarTrigger>
      <h1 className="font-headline text-lg font-semibold md:text-xl flex-1">{title}</h1>
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
