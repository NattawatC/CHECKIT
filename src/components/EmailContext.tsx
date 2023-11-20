import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

type EmailContextType = {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

const EmailContext = createContext<EmailContextType | undefined>(undefined);

interface EmailProviderProps {
  children: ReactNode;
}

export const EmailProvider: React.FC<EmailProviderProps> = ({ children }) => {
  const [email, setEmail] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      // Initialize the email from localStorage or an empty string if not present
      return localStorage.getItem('email') || '';
    } else {
      return ''; // Server-side rendering, set default value to empty string
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Save the email to localStorage whenever it changes
      localStorage.setItem('email', email);
    }
  }, [email]);

  return (
    <EmailContext.Provider value={{ email, setEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};
