import React, { useState } from "react";
import PropTypes from "prop-types";
import userContext, { UserContextType } from "./userContext";
interface UserContextProviderProps {
    children: React.ReactNode;
}
const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [user, setUser] = useState<UserContextType["user"]>(null);
    const [blogs, setBlogs] = useState<UserContextType["blogs"]>([]);
    const [resumes, setResumes] = useState<UserContextType["resumes"]>([]);
    const [error, setError] = useState<string>("");

    const getBlogs = async () => {
        try {
            const res = await fetch(`/api/blog/getposts`);
            if (res.ok) {
                const data = await res.json();
                setBlogs(data.posts);
            } else {
                throw new Error("Failed to fetch posts");
            }
        } catch (error) {
            setError("Error fetching blogs");
        } finally {
            setIsLoading(false);
        }
    };

    const getResumes = async () => {
        try {
            const res = await fetch(`/api/resume/getposts`);
            if (res.ok) {
                const data = await res.json();
                setResumes(data.resumes);
            } else {
                throw new Error("Failed to fetch resumes");
            }
        } catch (error) {
            setError("Error fetching resumes");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <userContext.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                isLoading,
                setIsLoading,
                user,
                setUser,
                blogs,
                setBlogs,
                resumes,
                setResumes,
                error,
                setError,
                getBlogs,
                getResumes,
            }}
        >
            {children}
        </userContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContextProvider;
