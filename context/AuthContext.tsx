import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// This is a mock user service. In a real app, this would be a backend API.
const mockUserService = {
  getUsers: (): User[] => {
    const users = localStorage.getItem('mockUsers');
    return users ? JSON.parse(users) : [];
  },
  saveUsers: (users: User[]) => {
    localStorage.setItem('mockUsers', JSON.stringify(users));
  },
  getCurrentUser: (): User | null => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  },
  setCurrentUser: (user: User | null) => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = mockUserService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password_do_not_use: string): Promise<User | null> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = mockUserService.getUsers();
        const user = users.find(u => u.username === username);
        if (user) {
          const userToStore = { id: user.id, username: user.username };
          mockUserService.setCurrentUser(userToStore);
          setCurrentUser(userToStore);
          setLoading(false);
          resolve(userToStore);
        } else {
          setLoading(false);
          resolve(null);
        }
      }, 1000);
    });
  };

  const signup = async (username: string, password_do_not_use: string): Promise<User | null> => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = mockUserService.getUsers();
        if (users.some(u => u.username === username)) {
          setLoading(false);
          reject(new Error('User already exists'));
          return;
        }
        const newUser: User = { id: Date.now().toString(), username, password: "mock_password" };
        const updatedUsers = [...users, newUser];
        mockUserService.saveUsers(updatedUsers);
        
        const userToStore = { id: newUser.id, username: newUser.username };
        mockUserService.setCurrentUser(userToStore);
        setCurrentUser(userToStore);
        setLoading(false);
        resolve(userToStore);
      }, 1000);
    });
  };

  const logout = () => {
    mockUserService.setCurrentUser(null);
    setCurrentUser(null);
  };

  const getAllUsers = (): User[] => {
    return mockUserService.getUsers().map(({ id, username }) => ({ id, username }));
  };

  const findUserByUsername = (username: string): User | null => {
    const users = mockUserService.getUsers();
    const user = users.find(u => u.username === username);
    if (user) {
        return { id: user.id, username: user.username };
    }
    return null;
  };

  const value = { currentUser, login, signup, logout, loading, getAllUsers, findUserByUsername };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;