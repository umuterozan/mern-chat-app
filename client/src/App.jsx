import Login from "./components/forms/Login";
import Register from "./components/forms/Register";
import { useState } from "react";

export default function App() {
    const [currentForm, setCurrentForm] = useState("login");

    const switchForm = (name) => {
        setCurrentForm(name)
    }

    return (
        <>
            {currentForm === "login" ? (
                <Login switchForm={switchForm} />
            ) : (
                <Register switchForm={switchForm} />
            )}
        </>
    );
}
