import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import Inbox from "./components/Inbox";
import { useState } from "react";
import { useEffect } from "react";

export default function App() {
    const [currentForm, setCurrentForm] = useState("login");

    const switchForm = (name) => {
        setCurrentForm(name);
    };

    useEffect(() => {
        console.log("app rendered")
    }, [])

    const checkAuth = () => {
        if (localStorage.getItem("_token")) {
            return (
                <Inbox switchForm={switchForm} />
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
