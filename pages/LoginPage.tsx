
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (username: string, password_do_not_use: string) => {
    setError(null);
    try {
      const user = await login(username, password_do_not_use);
      if (user) {
        navigate('/');
      } else {
        setError('Invalid username or password.');
      }
    } catch (err) {
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <AuthForm 
      formType="login" 
      onSubmit={handleLogin} 
      loading={loading} 
      error={error} 
    />
  );
};

export default LoginPage;