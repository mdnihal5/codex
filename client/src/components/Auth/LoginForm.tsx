import { useNavigate } from "react-router-dom";
import userContext, { UserContextType } from "../../utils/userContext";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useContext, useState } from "react";

function LogInForm() {
    const userContextValue = useContext(userContext) as UserContextType;
    const { setIsAuthenticated, setUser } = userContextValue;
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email, password);
        if (!email || !password) {
            return toast.error("Please fill all the fields");
        }
        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data: any = await res.json(); // Add type annotation for data
            if (data.success === false) {
                toast.error("login failed");
            }

            if (res.ok) {
                setIsAuthenticated(true);
                toast.success("login successful");
                setUser(data);
                navigate("/");
            }
        } catch (error) {
            toast.error("login failed");
            console.log("some error occured ", error);
        }
    };

    const inputClasses =
        "mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base sm:text-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-500 h-10";

    return (
        <div className="flex items-center justify-center w-[100vw] h-[100vh]">
            <div className="rounded-lg bg-gray-300 p-8 m-8 md:w-[50%] sm:w-[65%]  shadow-lg dark:bg-gray-800 transform transition-transform hover:scale-95 transition duration-300">
                <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-gray-100">Log in</h2>
                <form className="space-y-6" onSubmit={loginHandler}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </label>
                        <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} required className={inputClasses} />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Password
                        </label>
                        <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} required className={inputClasses} />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-sm font-medium text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:focus:ring-indigo-600 transition-colors duration-300 ease-in-out"
                    >
                        Log in
                    </button>
                </form>
                <div className="flex items-center justify-center mt-4">
                    <Link to="/register">
                        <h4>New User ! create Account </h4>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LogInForm;
