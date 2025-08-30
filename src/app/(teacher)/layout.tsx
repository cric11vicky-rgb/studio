
'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Upload,
  Video,
  MessageSquareWarning,
  BarChart,
  Users,
  BookOpen,
  LogOut,
  MoreHorizontal,
  GraduationCap,
  UserCog,
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
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import { useAuth } from '@/context/auth-context';

const menuItems = [
  { href: '/teacher-dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/teacher/content', label: 'Manage Content', icon: Upload },
  { href: '/teacher/schedule', label: 'Schedule Classes', icon: Video },
  { href: '/teacher/doubts', label: 'Manage Doubts', icon: MessageSquareWarning },
  { href: '/teacher/performance', label: 'Student Performance', icon: BarChart },
  { href: '/teacher/students', label: 'Manage Students', icon: Users },
  { href: '/teacher/curriculum', label: 'Curriculum', icon: BookOpen },
];

const adminOnlyMenuItems = [
    { href: '/teacher/teachers', label: 'Manage Teachers', icon: GraduationCap },
    { href: '/teacher/admin/manage', label: 'Manage Admin', icon: UserCog },
];

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/student/login');
      } else if (user.role === 'student') {
        router.push('/dashboard');
      }
    }
  }, [isLoading, user, router]);

  if (isLoading || !user || user.role === 'student') {
    return null; // Or a loading spinner
  }

  const allMenuItems = [...menuItems];
  if(user.role === 'admin') {
      allMenuItems.push(...adminOnlyMenuItems);
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo />
            <div className="flex flex-col">
              <span className="font-headline text-xl font-semibold">EduVerse</span>
              <span className="text-sm text-muted-foreground">Teacher Portal</span>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {allMenuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href}>
                  <SidebarMenuButton
                    isActive={pathname.startsWith(item.href)}
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
                <AvatarImage src="https://picsum.photos/100?teacher" alt="Teacher" data-ai-hint="teacher avatar" />
                <AvatarFallback>{user.name ? user.name.charAt(0) : 'T'}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col text-sm">
                <span className="font-semibold">{user.name}</span>
                <span className="text-muted-foreground">{user.email}</span>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="size-8">
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mb-2">
                <DropdownMenuLabel>{user.name} Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                 {user.role === 'admin' && (
                    <DropdownMenuItem>
                        <Link href="/dashboard" className='flex items-center w-full'>
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Student View</span>
                        </Link>
                    </DropdownMenuItem>
                 )}
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="mr-2 h-4 w-4" />
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
