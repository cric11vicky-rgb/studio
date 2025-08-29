
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

const AVAILABLE_CLASSES = ['3', '4', '5', '6', '7', '8', '9', '10', 'All'];

interface ClassContextType {
  selectedClass: string;
  setSelectedClass: (selectedClass: string) => void;
  availableClasses: string[];
  isModalOpen: boolean;
  setModalOpen: (isOpen: boolean) => void;
  isInitialized: boolean;
}

const ClassContext = createContext<ClassContextType | undefined>(undefined);

export const ClassProvider = ({ children }: { children: ReactNode }) => {
  const [selectedClass, setSelectedClassState] = useState<string>('All');
  const [isModalOpen, setModalOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedClass = localStorage.getItem('selectedClass');
      if (storedClass && AVAILABLE_CLASSES.includes(storedClass)) {
        setSelectedClassState(storedClass);
      } else {
        setModalOpen(true);
      }
      setIsInitialized(true);
    }
  }, []);

  const setSelectedClass = (newClass: string) => {
    if (AVAILABLE_CLASSES.includes(newClass)) {
      setSelectedClassState(newClass);
      localStorage.setItem('selectedClass', newClass);
      setModalOpen(false);
    }
  };

  return (
    <ClassContext.Provider value={{ selectedClass, setSelectedClass, availableClasses: AVAILABLE_CLASSES, isModalOpen, setModalOpen, isInitialized }}>
      {children}
    </ClassContext.Provider>
  );
};

export const useClass = () => {
  const context = useContext(ClassContext);
  if (context === undefined) {
    throw new Error('useClass must be used within a ClassProvider');
  }
  return context;
};
