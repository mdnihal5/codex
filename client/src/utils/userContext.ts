import React from "react";

export interface User {
  _id:string;
  id: string;
  username: string;
  email: string;
}

export interface Blog {
  _id:string;
  id: string;
  title: string;
  content: string;
}
export interface Message {
  _id:string;
  userId:string;
  username:string;
  text:string;
  date:string;
}
export interface Resume {
  _id:string;
  id: string;
  userId: string;
  email: string;
  github: string;
  description: string;
  linkdin: string;
  link:string;
}

export interface UserContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  blogs: Blog[];
  setBlogs: React.Dispatch<React.SetStateAction<Blog[]>>;
  resumes: Resume[];
  setResumes: React.Dispatch<React.SetStateAction<Resume[]>>;
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
  getBlogs: () => Promise<void>;
  getResumes: () => Promise<void>;
  getMessages:()=>Promise<void>;
  messages:Message[];
  setMessages:React.Dispatch<React.SetStateAction<Message[]>>;
}

const userContext = React.createContext<UserContextType | undefined>(undefined);

export default userContext;
