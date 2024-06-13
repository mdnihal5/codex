import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
import userContext, { UserContextType } from "./userContext";

const ErrorPage: FC = () => {
    const context = useContext(userContext);

    if (!context || !context.error) {
        return null;
    }

    const { error } = context as UserContextType;

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
            <div className="mx-auto max-w-md space-y-4 text-center">
                <TriangleAlert className="mx-auto h-16 w-16 text-red-500 dark:text-red-400" />
                <h1>{error}</h1>
                <Link
                    className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-6 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    to="/"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
