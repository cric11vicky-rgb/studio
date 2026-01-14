
'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'English' | 'हिन्दी';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  getTranslation: (key: string) => string;
}

const translations: Record<string, Record<string, string>> = {
  'Dashboard': { 'English': 'Dashboard', 'हिन्दी': 'डैशबोर्ड' },
  'Books': { 'English': 'Books', 'हिन्दी': 'किताबें' },
  'Live Classes': { 'English': 'Live Classes', 'हिन्दी': 'लाइव कक्षाएं' },
  'Recorded Classes': { 'English': 'Recorded Classes', 'हिन्दी': 'रिकॉर्डेड कक्षाएं' },
  'Notes': { 'English': 'Notes', 'हिन्दी': 'नोट्स' },
  'Tests': { 'English': 'Tests', 'हिन्दी': 'टेस्ट' },
  'Doubts': { 'English': 'Doubts', 'हिन्दी': 'संदेह' },
  'Progress': { 'English': 'Progress', 'हिन्दी': 'प्रगति' },
  'Help': { 'English': 'Help', 'हिन्दी': 'सहायता' },
  'Welcome Back': { 'English': 'Welcome Back', 'हिन्दी': 'वापस स्वागत है' },
  'Let\'s make today productive.': { 'English': 'Let\'s make today productive.', 'हिन्दी': 'चलिए आज का दिन उत्पादक बनाते हैं।' },
  'Completed Tests': { 'English': 'Completed Tests', 'हिन्दी': 'पूर्ण परीक्षण' },
  'from last month': { 'English': 'from last month', 'हिन्दी': 'पिछले महीने से' },
  'Attendance': { 'English': 'Attendance', 'हिन्दी': 'उपस्थिति' },
  'in live classes': { 'English': 'in live classes', 'हिन्दी': 'लाइव कक्षाओं में' },
  'Average Score': { 'English': 'Average Score', 'हिन्दी': 'औसत अंक' },
  'across all subjects': { 'English': 'across all subjects', 'हिन्दी': 'सभी विषयों में' },
  'Next Live Class': { 'English': 'Next Live Class', 'हिन्दी': 'अगली लाइव कक्षा' },
  'Your Progress': { 'English': 'Your Progress', 'हिन्दी': 'आपकी प्रगति' },
  'Track your scores across different subjects.': { 'English': 'Track your scores across different subjects.', 'हिन्दी': 'विभिन्न विषयों में अपने स्कोर को ट्रैक करें।' },
  'Mathematics': { 'English': 'Mathematics', 'हिन्दी': 'गणित' },
  'Science': { 'English': 'Science', 'हिन्दी': 'विज्ञान' },
  'English': { 'English': 'English', 'हिन्दी': 'अंग्रेज़ी' },
  'Social Science': { 'English': 'Social Science', 'हिन्दी': 'सामाजिक विज्ञान' },
  'Quick Access': { 'English': 'Quick Access', 'हिन्दी': 'त्वरित ऐक्सेस' },
  'Upcoming Live Class': { 'English': 'Upcoming Live Class', 'हिन्दी': 'आगामी लाइव कक्षा' },
  'Recent Test Result': { 'English': 'Recent Test Result', 'हिन्दी': 'हालिया परीक्षा परिणाम' },
  'New Notes Available': { 'English': 'New Notes Available', 'हिन्दी': 'नए नोट्स उपलब्ध हैं' },
  'Mathematics - Algebra Basics': { 'English': 'Mathematics - Algebra Basics', 'हिन्दी': 'गणित - बीजगणित की मूल बातें' },
  'Science - Chapter 5 Test': { 'English': 'Science - Chapter 5 Test', 'हिन्दी': 'विज्ञान - अध्याय 5 टेस्ट' },
  'History - The Mauryan Empire': { 'English': 'History - The Mauryan Empire', 'हिन्दी': 'इतिहास - मौर्य साम्राज्य' },
  'Digital Books': {'English': 'Digital Books', 'हिन्दी': 'डिजिटल किताबें'},
  'Solutions': {'English': 'Textbook Solutions', 'हिन्दी': 'पाठ्यपुस्तक समाधान'},
  'Textbook Solutions': {'English': 'Textbook Solutions', 'हिन्दी': 'पाठ्यपुस्तक समाधान'},
  'My Notes': {'English': 'My Notes', 'हिन्दी': 'मेरे नोट्स'},
  'Doubt Section': {'English': 'Doubt Section', 'हिन्दी': 'संदेह अनुभाग'},
  'AI Paper Generator': {'English': 'AI Paper Generator', 'हिन्दी': 'एआई पेपर जेनरेटर'},
  'Practice Tests': {'English': 'Practice Tests', 'हिन्दी': 'अभ्यास परीक्षण'},
  'Help & Contact': {'English': 'Help & Contact', 'हिन्दी': 'सहायता और संपर्क'},
  'Progress Report': {'English': 'Progress Report', 'हिन्दी': 'प्रगति रिपोर्ट'},
  'Previous Papers': {'English': 'Previous Papers', 'हिन्दी': 'पिछले पेपर'},
  'Previous Year Papers': {'English': 'Previous Year Papers', 'हिन्दी': 'पिछले वर्ष के पेपर'},
  'AI Solutions': {'English': 'AI Solutions', 'हिन्दी': 'एआई समाधान'},
  'Explore Smart Vidya': {'English': 'Explore Smart Vidya', 'हिन्दी': 'स्मार्ट विद्या अन्वेषण करें'},
  'All your learning tools in one place.': {'English': 'All your learning tools in one place.', 'हिन्दी': 'आपके सभी शिक्षण उपकरण एक ही स्थान पर।'},
  'Maths': {'English': 'Maths', 'हिन्दी': 'गणित'},
  'Today, 4:00 PM': {'English': 'Today, 4:00 PM', 'हिन्दी': 'आज, शाम 4:00 बजे'},
  'Find Textbook Solutions': {'English': 'Find Textbook Solutions', 'हिन्दी': 'पाठ्यपुस्तक समाधान खोजें'},
  'Get step-by-step solutions for textbook questions, including NCERT and sample papers, to help you understand concepts better and prepare for exams.': {'English': 'Get step-by-step solutions for textbook questions, including NCERT and sample papers, to help you understand concepts better and prepare for exams.', 'हिन्दी': 'अवधारणाओं को बेहतर ढंग से समझने और परीक्षा की तैयारी में मदद के लिए एनसीईआरटी और सैंपल पेपर सहित पाठ्यपुस्तक के प्रश्नों के लिए चरण-दर-चरण समाधान प्राप्त करें।'},
  'View Solutions': {'English': 'View Solutions', 'हिन्दी': 'समाधान देखें'},
  'exercises with detailed solutions.': {'English': 'exercises with detailed solutions.', 'हिन्दी': 'विस्तृत समाधान के साथ अभ्यास।'},
  'No solutions found for Class': {'English': 'No solutions found for Class', 'हिन्दी': 'कक्षा के लिए कोई समाधान नहीं मिला'},
  'Please select a different class.': {'English': 'Please select a different class.', 'हिन्दी': 'कृपया एक अलग कक्षा चुनें।'},
  'Class': {'English': 'Class', 'हिन्दी': 'कक्षा'},
  'My Account': {'English': 'My Account', 'हिन्दी': 'मेरा खाता'},
  'Profile': {'English': 'Profile', 'हिन्दी': 'प्रोफ़ाइल'},
  'Settings': {'English': 'Settings', 'हिन्दी': 'सेटिंग्स'},
  'Log out': {'English': 'Log out', 'हिन्दी': 'लॉग आउट'},
  'Environment Studies': {'English': 'Environment Studies', 'हिन्दी': 'पर्यावरण अध्ययन'},
  'General Knowledge': {'English': 'General Knowledge', 'हिन्दी': 'सामान्य ज्ञान'},
  'Mathematics (Science)': {'English': 'Mathematics (Science)', 'हिन्दी': 'गणित (विज्ञान)'},
  'Accountancy (Commerce)': {'English': 'Accountancy (Commerce)', 'हिन्दी': 'लेखा (वाणिज्य)'},
  'Biology (Science)': {'English': 'Biology (Science)', 'हिन्दी': 'जीव विज्ञान (विज्ञान)'},
  'Chapter Notes': { 'English': 'Chapter Notes', 'हिन्दी': 'अध्याय नोट्स' },
  'Find concise notes for various chapters to help you revise quickly.': { 'English': 'Find concise notes for various chapters to help you revise quickly.', 'हिन्दी': 'जल्दी से दोहराने में मदद के लिए विभिन्न अध्यायों के संक्षिप्त नोट्स खोजें।' },
  'No notes found for Class': { 'English': 'No notes found for Class', 'हिन्दी': 'कक्षा के लिए कोई नोट्स नहीं मिला' },
  'Biology': { 'English': 'Biology', 'हिन्दी': 'जीव विज्ञान' },
  'Hindi': { 'English': 'Hindi', 'हिन्दी': 'हिन्दी' },
  'EVS': { 'English': 'EVS', 'हिन्दी': 'ईवीएस' },
  'History': { 'English': 'History', 'हिन्दी': 'इतिहास' },
  'Chemistry': { 'English': 'Chemistry', 'हिन्दी': 'रसायन विज्ञान' },
  'Physics (Science)': { 'English': 'Physics (Science)', 'हिन्दी': 'भौतिकी (विज्ञान)' },
  'Political Science (Arts)': { 'English': 'Political Science (Arts)', 'हिन्दी': 'राजनीति विज्ञान (कला)' },
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
