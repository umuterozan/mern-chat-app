import { createContext } from "react";

export const Context = createContext();

const Provider = ({ children }) => {
    const userData = {
        _token: localStorage.getItem("_token"),
        _user: JSON.parse(localStorage.getItem("_user")),
    };

    return <Context.Provider value={userData}>{children}</Context.Provider>;
};

export default Provider;
