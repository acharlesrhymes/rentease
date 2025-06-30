import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'renter' | 'landlord';
  propertyId?: string;
  propertyName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for existing auth
    const savedUser = localStorage.getItem('rentease_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Mock authentication - in production, this would call your API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockUser: User = email.includes('landlord') 
      ? {
          id: '2',
          name: 'Sarah Johnson',
          email,
          role: 'landlord'
        }
      : {
          id: '1',
          name: 'John Smith',
          email,
          role: 'renter',
          propertyId: '202',
          propertyName: 'Apartment #202'
        };
    
    setUser(mockUser);
    localStorage.setItem('rentease_user', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('rentease_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};