import React, { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import userContext, { UserContextType } from "./utils/userContext";
import Navbar from "./components/Navbar/Navbar";
import ErrorPage from "./utils/ErrorPage";
import HomePage from "./pages/HomePage/HomePage";
import LogInForm from "./components/Auth/LoginForm";
import SignUpForm from "./components/Auth/SignUpForm";
import Resources from "./pages/Resources/Resources";
import Resumes from "./pages/Resumes/Resumes";
import Chats from "./pages/ChatScreen/Chats";

const App: React.FC = () => {
    const { getBlogs, setUser, getResumes, getMessages, setIsAuthenticated, isAuthenticated } = useContext(userContext) as UserContextType;
    useEffect(() => {
        const intervalId = setInterval(() => {
            getBlogs();
            const user = localStorage.getItem("user");
            const token = localStorage.getItem("access_token");
            if (user && token) {
                document.cookie = `access_token=${token}; expires=${new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString()}; path=/`;
                setUser(JSON.parse(user));
                setIsAuthenticated(true);
            }
            if (isAuthenticated) getResumes();
            if (isAuthenticated) getMessages();
        }, 5000);

        return () => {
            clearInterval(intervalId);
        };
    }, [isAuthenticated]);
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogInForm />} />
                <Route path="/chats" element={isAuthenticated && <Chats />} />
                <Route path="/register" element={<SignUpForm />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/resumes" element={isAuthenticated && <Resumes />} />
                <Route path="/resources" element={<Resources />} />
            </Routes>
            <Navbar />
            <Toaster position="top-center" />
        </>
    );
};

export default App;
