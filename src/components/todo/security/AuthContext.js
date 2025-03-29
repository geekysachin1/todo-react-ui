import { createContext, useContext, useState } from "react";

//create a context
export const AuthContext = createContext();

// hook to allow to use context directly
export const useAuth = () => useContext(AuthContext);


//share the created context with other components
export default function AuthProvider({ children }) {

    //put some state in context
    const [number, setNumber] = useState(90);

    // function setNumber(num) {
    //     number = num;
    // }

    return (
        <AuthContext.Provider value={{ number }} >
            {children}
        </AuthContext.Provider>
    )
}