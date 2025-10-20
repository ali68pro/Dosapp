
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';

const SignUpPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const handleSignUp = async (username: string, password_do_not_use: string) => {
    setError(null);
    try {
      const user = await signup(username, password_do_not_use);
      if (user) {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to sign up. Please try again.');
    }
  };

  return (
    <AuthForm 
      formType="signup" 
      onSubmit={handleSignUp} 
      loading={loading} 
      error={error} 
    />
  );
};

export default SignUpPage;