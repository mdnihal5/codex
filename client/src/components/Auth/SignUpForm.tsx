import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useState } from "react";
function SignUpForm() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const navigate = useNavigate();

    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!username || !email || !password) {
            return toast.error("Please fill out all fields.");
        }
        try {
            const res = await fetch("/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password,
                }),
            });
            const data: any = await res.json();
            if (data.success === false) {
                toast.error("registration failed");
            }
            if (res.ok) {
                toast.success("registration successful ! please login to continue.");
                navigate("/login");
            }
        } catch (error) {
            toast.error("registration failed");
            console.log("some error occured ", error);
        }
    };

    const inputClasses =
        "mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-base sm:text-lg dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-indigo-500 h-10";

    return (
        <div className="flex items-center justify-center w-[100vw] h-[100vh]">
            <div className="rounded-lg bg-gray-300 p-8 m-8 md:w-[50%] sm:w-[65%]  shadow-lg dark:bg-gray-800 transform transition-transform hover:scale-95 transition duration-300">
                <h2 className="text-3xl font-bold tracking-tight text-center text-gray-900 dark:text-gray-100">Sign Up</h2>
                <form className="space-y-6" onSubmit={registerHandler}>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            User Name
                        </label>
                        <input id="username" type="text" onChange={(e) => setUsername(e.target.value)} required className={inputClasses} />
                    </div>
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
                        Sign Up
                    </button>
                </form>
                <div className="flex items-center justify-center mt-4">
                    <Link to="/login">
                        <h4>Already Have Account ! Login</h4>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
