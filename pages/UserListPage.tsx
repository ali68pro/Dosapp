import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { User } from '../types';

const UserListPage: React.FC = () => {
  const { currentUser, getAllUsers, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (currentUser) {
      const otherUsers = getAllUsers().filter(user => user.id !== currentUser.id);
      setUsers(otherUsers);
    }
  }, [currentUser, getAllUsers]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <header className="bg-gray-800/50 backdrop-blur-sm p-4 flex justify-between items-center border-b border-gray-700 sticky top-0 z-10">
        <h1 className="text-xl font-bold text-white">Contacts</h1>
        <button
          onClick={logout}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md text-sm transition-colors duration-200"
        >
          Logout
        </button>
      </header>
      <main className="flex-grow overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          {users.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {users.map(user => (
                <li key={user.id}>
                  <Link 
                    to={`/chat/${user.username}`}
                    className="flex items-center p-4 hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg flex-shrink-0 mr-4">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium">{user.username}</span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center text-gray-400 mt-20 p-4">
              <h2 className="text-2xl font-semibold">No Other Users Found</h2>
              <p>To start chatting, please sign up with another account in a different browser tab or window.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserListPage;