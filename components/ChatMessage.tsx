import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
  senderInitial: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser, senderInitial }) => {

  const UserIcon = () => (
    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${isCurrentUser ? 'bg-blue-500' : 'bg-indigo-500'}`}>
      {senderInitial}
    </div>
  );

  return (
    <div className={`flex items-start gap-3 my-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
      {!isCurrentUser && <UserIcon />}
      <div
        className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md ${
          isCurrentUser
            ? 'bg-blue-600 text-white rounded-br-none'
            : 'bg-gray-700 text-gray-200 rounded-bl-none'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
       {isCurrentUser && <UserIcon />}
    </div>
  );
};

export default ChatMessage;