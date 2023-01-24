import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Chat from "./components/forms/Chat";
import { useState } from "react";

export default function App() {
    const [currentForm, setCurrentForm] = useState("login");

    const switchForm = (name) => {
        setCurrentForm(name);
    };

    const checkAuth = () => {
        if (localStorage.getItem("_token")) {
            return (
                <Chat />
            )
        } else {
            switch (currentForm) {
                case "login":
                    return (<Login switchForm={switchForm} />)

                case "register":
                    return (<Register switchForm={switchForm} />)
            }
        }
    }

    return (
        <>
            {checkAuth()}
        </>
    );
}
