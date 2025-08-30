
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

const MOCK_OTP = '123456';

const initialAdminState = {
    password: 'Vikas@2012',
    name: 'Admin',
    email: 'admin@eduverse.com',
    role: 'admin' as Role,
    mobileNumber: '9549543576',
};


type LoginType = 'password' | 'otp' | 'check_user';

interface AuthContextType {
  user: User | null;
  adminUser: typeof initialAdminState | null;
  login: (username: string, credentials: string, otpVerified: boolean, method: LoginType) => User | null;
  studentLogin: (username: string, password: string) => User | null;
  logout: () => void;
  isLoading: boolean;
  addTeacher: (teacher: TeacherUser) => boolean;
  getTeachers: () => TeacherUser[];
  updateAdminCredentials: (data: { password?: string, mobileNumber?: string }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [teachers, setTeachers] = useState<Record<string, TeacherUser>>({});
  const [adminUser, setAdminUser] = useState<typeof initialAdminState | null>(null);
  const router = useRouter();
  const pathname = usePathname();

   useEffect(() => {
    if (typeof window !== 'undefined') {
        const savedTeachers = localStorage.getItem('teachers');
        if (savedTeachers) {
            setTeachers(JSON.parse(savedTeachers));
        }
        const savedAdmin = localStorage.getItem('adminUser');
        if (savedAdmin) {
            setAdminUser(JSON.parse(savedAdmin));
        } else {
             localStorage.setItem('adminUser', JSON.stringify(initialAdminState));
             setAdminUser(initialAdminState);
        }
    }
  }, []);
  
  const updateAdminCredentials = (data: { password?: string, mobileNumber?: string }) => {
      if (adminUser) {
        const newAdminData = { ...adminUser, ...data };
        setAdminUser(newAdminData);
        localStorage.setItem('adminUser', JSON.stringify(newAdminData));
      }
  };


  const getCombinedUsers = () => {
    const combined: Record<string, any> = { admin: adminUser };
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
        
        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/student') || pathname === '/contact' || pathname.startsWith('/teacher/admin');
        if (!loggedInUser && !isAuthPage) {
          router.push('/student/login');
        }
      } catch (error) {
        console.error("Failed to parse user from session storage", error);
        setUser(null);
        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/student') || pathname === '/contact' || pathname.startsWith('/teacher/admin');
        if (!isAuthPage) {
          router.push('/student/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router]);

  const login = (username: string, credentials: string, otpVerified: boolean, method: LoginType): User | null => {
    const allUsers = getCombinedUsers();
    const userData = allUsers[username.toLowerCase()];
    
    if (!userData) return null;

    const doLogin = () => {
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

    if (method === 'check_user') {
        return { username: 'exists', name: '', email: '', role: 'student' }; // Dummy user
    }
    
    if (method === 'password' && credentials === userData.password) {
        return doLogin();
    }

    if (method === 'otp' && credentials === MOCK_OTP) {
        return doLogin();
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
    <AuthContext.Provider value={{ user, adminUser, login, studentLogin, logout, isLoading, addTeacher, getTeachers, updateAdminCredentials }}>
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
