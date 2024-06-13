import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import UserContextprovider from "./utils/UserContextProvider";
import { ThemeProvider } from "./utils/ThemeProvider";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <UserContextprovider>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </UserContextprovider>
    </React.StrictMode>
);
