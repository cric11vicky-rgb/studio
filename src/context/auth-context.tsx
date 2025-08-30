
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Role = 'admin' | 'teacher' | 'student';

export interface User {
  username: string;
  name: string;
  email: string;
  role: Role;
}

export interface TeacherUser {
  username: string;
  name: string;
  password?: string; // Optional for security reasons on client
  mobileNumber: string;
  role: 'teacher';
}


// In a real application, this would be handled by a proper authentication service.
const staticUsers: Record<string, { password?: string; name: string; email: string; role: Role; mobileNumber?: string }> = {
  admin: { password: 'Vikas@3415', name: 'Admin', email: 'admin@eduverse.com', role: 'admin', mobileNumber: '9876543210' },
};

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, otpVerified: boolean) => User | null;
  studentLogin: (username: string, password: string) => User | null;
  logout: () => void;
  isLoading: boolean;
  addTeacher: (teacher: TeacherUser) => boolean;
  getTeachers: () => TeacherUser[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teachers, setTeachers] = useState<Record<string, TeacherUser>>({});
  const router = useRouter();
  const pathname = usePathname();

   useEffect(() => {
    if (typeof window !== 'undefined') {
        const savedTeachers = localStorage.getItem('teachers');
        if (savedTeachers) {
            setTeachers(JSON.parse(savedTeachers));
        }
    }
  }, []);

  const getCombinedUsers = () => {
    const combined = { ...staticUsers };
    Object.values(teachers).forEach(t => {
      combined[t.username.toLowerCase()] = { ...t, email: `${t.username}@eduverse.com` };
    });
    return combined;
  };

  const addTeacher = (teacher: TeacherUser): boolean => {
      const allUsers = getCombinedUsers();
      if (allUsers[teacher.username.toLowerCase()]) {
          return false; // Username already exists
      }
      const newTeachers = { ...teachers, [teacher.username.toLowerCase()]: teacher };
      setTeachers(newTeachers);
      localStorage.setItem('teachers', JSON.stringify(newTeachers));
      return true;
  };
  
  const getTeachers = (): TeacherUser[] => {
      return Object.values(teachers);
  }

  useEffect(() => {
    const checkAuth = () => {
      try {
        const session = sessionStorage.getItem('eduverseUser');
        const loggedInUser = session ? (JSON.parse(session) as User) : null;
        setUser(loggedInUser);
        
        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/student') || pathname === '/contact';
        if (!loggedInUser && !isAuthPage) {
          router.push('/student/login');
        }
      } catch (error) {
        console.error("Failed to parse user from session storage", error);
        setUser(null);
        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/student') || pathname === '/contact';
        if (!isAuthPage) {
          router.push('/student/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router]);

  const login = (username: string, password: string, otpVerified: boolean): User | null => {
    const allUsers = getCombinedUsers();
    const userData = allUsers[username.toLowerCase()];
    
    if (userData && password === userData.password) {
      if (!otpVerified) {
        // This is a check to see if user exists, before OTP step.
        return { username: 'exists', name: '', email: '', role: 'student' }; // Return a dummy user to indicate success
      }
      const loggedInUser: User = {
        username: username.toLowerCase(),
        name: userData.name,
        email: userData.email,
        role: userData.role,
      };
      sessionStorage.setItem('eduverseUser', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return loggedInUser;
    }
    return null;
  };
  
  const studentLogin = (username: string, password: string): User | null => {
    const studentUsers = JSON.parse(localStorage.getItem('studentUsers') || '{}');
    const userData = studentUsers[username.toLowerCase()];
    if (userData && password === userData.password) {
      const loggedInUser: User = {
        username: username.toLowerCase(),
        name: userData.name,
        email: `${username}@eduverse.com`,
        role: 'student',
      };
      sessionStorage.setItem('eduverseUser', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return loggedInUser;
    }
    return null;
  };

  const logout = () => {
    sessionStorage.removeItem('eduverseUser');
    setUser(null);
    router.push('/student/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, studentLogin, logout, isLoading, addTeacher, getTeachers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
