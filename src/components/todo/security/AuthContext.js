import { createContext, useContext, useState } from "react";

//create a context
export const AuthContext = createContext();

// hook to allow to use context directly
export const useAuth = () => useContext(AuthContext);


//share the created context with other components
export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    function login(userName, password) {
        if (userName === 'admin' && password === "admin") {
            setAuthenticated(true);
            return true;
        }
        else {
            setAuthenticated(false);
            return false;
        }
    }

    function logout() {
        setAuthenticated(false);
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}