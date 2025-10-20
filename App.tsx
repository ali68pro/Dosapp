import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ChatPage from './pages/ChatPage';
import UserListPage from './pages/UserListPage';

const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const AuthRedirect: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { currentUser } = useAuth();
    return currentUser ? <Navigate to="/" /> : children;
};


const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthRedirect><LoginPage /></AuthRedirect>} />
      <Route path="/signup" element={<AuthRedirect><SignUpPage /></AuthRedirect>} />
      <Route 
        path="/chat/:username" 
        element={
          <PrivateRoute>
            <ChatPage />
          </PrivateRoute>
        } 
      />
       <Route 
        path="/" 
        element={
          <PrivateRoute>
            <UserListPage />
          </PrivateRoute>
        } 
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
};

export default App;