'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'English' | 'हिन्दी';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  getTranslation: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  'Dashboard': {
    'English': 'Dashboard',
    'हिन्दी': 'डैशबोर्ड',
  },
  'Digital Books': {
    'English': 'Digital Books',
    'हिन्दी': 'डिजिटल किताबें',
  },
  'Solutions': {
    'English': 'Textbook Solutions',
    'हिन्दी': 'पाठ्यपुस्तक समाधान',
  },
    'Textbook Solutions': {
    'English': 'Textbook Solutions',
    'हिन्दी': 'पाठ्यपुस्तक समाधान',
  },
  'Recorded Classes': {
    'English': 'Recorded Classes',
    'हिन्दी': 'रिकॉर्डेड कक्षाएं',
  },
  'Live Classes': {
    'English': 'Live Classes',
    'हिन्दी': 'लाइव कक्षाएं',
  },
  'My Notes': {
    'English': 'My Notes',
    'हिन्दी': 'मेरे नोट्स',
  },
  'Doubt Section': {
    'English': 'Doubt Section',
    'हिन्दी': 'संदेह अनुभाग',
  },
  'AI Paper Generator': {
    'English': 'AI Paper Generator',
    'हिन्दी': 'एआई पेपर जेनरेटर',
  },
  'Practice Tests': {
    'English': 'Practice Tests',
    'हिन्दी': 'अभ्यास परीक्षण',
  },
  'Help & Contact': {
    'English': 'Help & Contact',
    'हिन्दी': 'सहायता और संपर्क',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('English');

  const getTranslation = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
