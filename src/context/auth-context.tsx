
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

type Role = 'admin' | 'teacher' | 'student';

export interface User {
  username: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
}

export interface TeacherUser {
  username: string;
  name: string;
  password?: string; // Optional for security reasons on client
  mobileNumber: string;
  role: 'teacher';
}

const initialAdminState = {
    password: 'Vikas@2012',
    name: 'Admin',
    email: 'admin@smartvidya.com',
    role: 'admin' as Role,
    mobileNumber: '9549543576',
};

interface AuthContextType {
  user: User | null;
  adminUser: typeof initialAdminState | null;
  login: (username: string, credentials: string) => User | null;
  studentLogin: (username: string, password: string) => User | null;
  logout: () => void;
  isLoading: boolean;
  addTeacher: (teacher: TeacherUser) => boolean;
  getTeachers: () => TeacherUser[];
  updateAdminCredentials: (data: { password?: string, mobileNumber?: string }) => void;
  updateUserAvatar: (avatarUrl: string) => void;
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
      combined[t.username.toLowerCase()] = { ...t, email: `${t.username}@smartvidya.com` };
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

  const updateUserAvatar = (avatarUrl: string) => {
    if (user) {
      const updatedUser = { ...user, avatar: avatarUrl };
      setUser(updatedUser);
      sessionStorage.setItem('smartVidyaUser', JSON.stringify(updatedUser));
      const studentUsers = JSON.parse(localStorage.getItem('studentUsers') || '{}');
      if (studentUsers[user.username]) {
        studentUsers[user.username].avatar = avatarUrl;
        localStorage.setItem('studentUsers', JSON.stringify(studentUsers));
      }
    }
  };


  useEffect(() => {
    const checkAuth = () => {
      try {
        const session = sessionStorage.getItem('smartVidyaUser');
        const loggedInUser = session ? (JSON.parse(session) as User) : null;
        setUser(loggedInUser);
        
        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/student') || pathname === '/contact' || pathname.startsWith('/admin') || pathname.startsWith('/profile');
        if (!loggedInUser && !isAuthPage) {
          router.push('/student/login');
        }
      } catch (error) {
        console.error("Failed to parse user from session storage", error);
        setUser(null);
        const isAuthPage = pathname.startsWith('/login') || pathname.startsWith('/student') || pathname === '/contact' || pathname.startsWith('/admin') || pathname.startsWith('/profile');
        if (!isAuthPage) {
          router.push('/student/login');
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [pathname, router]);

  const login = (username: string, password: string): User | null => {
    const allUsers = getCombinedUsers();
    const userData = allUsers[username.toLowerCase()];
    
    if (!userData) return null;

    const doLogin = () => {
        const loggedInUser: User = {
            username: username.toLowerCase(),
            name: userData.name,
            email: userData.email,
            role: userData.role,
            avatar: `https://picsum.photos/seed/${username}/100`,
        };
        sessionStorage.setItem('smartVidyaUser', JSON.stringify(loggedInUser));
        setUser(loggedInUser);
        return loggedInUser;
    }
    
    // Special case for admin OTP login
    if (username.toLowerCase() === 'admin' && password === 'otp-verified') {
        return doLogin();
    }
    
    if (password === userData.password) {
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
        email: `${username}@smartvidya.com`,
        role: 'student',
        avatar: userData.avatar || `https://picsum.photos/seed/${username}/100`,
      };
      sessionStorage.setItem('smartVidyaUser', JSON.stringify(loggedInUser));
      setUser(loggedInUser);
      return loggedInUser;
    }
    return null;
  };

  const logout = () => {
    sessionStorage.removeItem('smartVidyaUser');
    setUser(null);
    router.push('/student/login');
  };

  return (
    <AuthContext.Provider value={{ user, adminUser, login, studentLogin, logout, isLoading, addTeacher, getTeachers, updateAdminCredentials, updateUserAvatar }}>
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
