import UserProvider from "./context/UserContext";
import Login from "./components/Login";
import Register from "./components/Register";
import Inbox from "./components/Inbox";
import { useState } from "react";

export default function App() {
    const [currentForm, setCurrentForm] = useState("login");

    const switchForm = (name) => {
        setCurrentForm(name);
    };

    const checkAuth = () => {
        if (localStorage.getItem("_accessToken")) {
            return <Inbox />;
        } else {
            switch (currentForm) {
                case "login":
                    return <Login switchForm={switchForm} />;

                case "register":
                    return <Register switchForm={switchForm} />;
                default:
                    return <Login switchForm={switchForm} />;
            }
        }
    };

    return <UserProvider>{checkAuth()}</UserProvider>;
}
