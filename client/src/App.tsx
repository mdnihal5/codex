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

const App: React.FC = () => {
    const { getBlogs, getResumes, isAuthenticated } = useContext(userContext) as UserContextType;
    useEffect(() => {
        getBlogs();
        getResumes();
    }, []);
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LogInForm />} />
                <Route path="/chats" element={<h1>Comming Soon ! Yet to implement</h1>} />
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
