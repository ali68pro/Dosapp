import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Message, User } from '../types';
import Header from '../components/Header';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import { getMessages, addMessage } from '../services/messageService';
import { useAuth } from '../hooks/useAuth';

const ChatPage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { currentUser, findUserByUsername } = useAuth();
  
  const [recipient, setRecipient] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (username) {
      const foundUser = findUserByUsername(username);
      if (foundUser && foundUser.id !== currentUser?.id) {
        setRecipient(foundUser);
      } else {
        // Handle user not found or chatting with oneself
        navigate('/');
      }
    }
  }, [username, findUserByUsername, navigate, currentUser]);

  useEffect(() => {
    if (currentUser && recipient) {
      const messageHistory = getMessages(currentUser.id, recipient.id);
      setMessages(messageHistory);
    }
  }, [currentUser, recipient]);
  
  // A simple polling mechanism to simulate real-time updates for the demo.
  useEffect(() => {
    if (!currentUser || !recipient) return;
    
    const interval = setInterval(() => {
        const updatedMessages = getMessages(currentUser.id, recipient.id);
        if (updatedMessages.length !== messages.length) {
          setMessages(updatedMessages);
        }
    }, 1000); // Poll every second

    return () => clearInterval(interval);
  }, [currentUser, recipient, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (userMessage: string) => {
    if (!currentUser || !recipient) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      senderId: currentUser.id,
      recipientId: recipient.id,
      timestamp: Date.now(),
    };
    
    // Add the message and update the state immediately for a responsive feel
    addMessage(newMessage);
    setMessages(prev => [...prev, newMessage]);
  };

  if (!recipient) {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
            Loading...
        </div>
    );
  }
  
  const getSenderInitial = (message: Message): string => {
    if (message.senderId === currentUser?.id) {
        return currentUser.username.charAt(0).toUpperCase();
    }
    if (message.senderId === recipient?.id) {
        return recipient.username.charAt(0).toUpperCase();
    }
    return '?';
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <Header title={recipient.username} showBackButton={true} />
      <main className="flex-grow overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {messages.length === 0 ? (
            <div className="text-center text-gray-400 mt-20">
              <h2 className="text-2xl font-semibold">Start Conversation</h2>
              <p>Send a message to start chatting with {recipient.username}.</p>
            </div>
          ) : (
            messages.map((msg) => (
                <ChatMessage 
                    key={msg.id} 
                    message={msg} 
                    isCurrentUser={msg.senderId === currentUser?.id}
                    senderInitial={getSenderInitial(msg)}
                />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatPage;