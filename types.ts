export interface User {
  id: string;
  username: string;
  password?: string; // Password should not be stored in client-side state long-term
}

export interface Message {
  id: string;
  text: string;
  senderId: string;
  recipientId: string;
  timestamp: number;
}

export interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password_do_not_use: string) => Promise<User | null>;
  signup: (username: string, password_do_not_use: string) => Promise<User | null>;
  logout: () => void;
  loading: boolean;
  getAllUsers: () => User[];
  findUserByUsername: (username: string) => User | null;
}