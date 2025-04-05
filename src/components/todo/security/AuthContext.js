import { createContext, useContext, useState } from "react";
import { loginServiceBasic } from "../services/UserService";
import { apiClient } from "../services/ApiClient";

//create a context
export const AuthContext = createContext();

// hook to allow to use context directly
export const useAuth = () => useContext(AuthContext);


//share the created context with other components
export default function AuthProvider({ children }) {
    const [isAuthenticated, setAuthenticated] = useState(false);

    const [username, setUsername] = useState(null);
    const [token, setToken] = useState(null);

    // function login(userName, password) {
    //     if (userName === 'admin' && password === "admin") {
    //         setUsername(userName);
    //         setAuthenticated(true);
    //         return true;
    //     }
    //     else {
    //         setUsername(null);
    //         setAuthenticated(false);
    //         return false;
    //     }
    // }

    async function login(userName, password) {
        let username = userName;
        password = window.btoa(password);

        try {
            const response = await loginServiceBasic({ username, password });
            console.log(response);


            if (response.status === 200) {
                const basicToken = `Basic ${response.data}`;
                setUsername(userName);
                setToken(basicToken);
                console.log("TOKEN:", username + ':' + basicToken)
                setAuthenticated(true);

                apiClient.interceptors.request.use(
                    (config) => {
                        console.log('Intercepting token:', basicToken);
                        config.headers.Authorization = basicToken;
                        return config;
                    }
                )

                apiClient.interceptors.response.use(
                    (response) => response,
                    (error) => {
                        if (error.response && error.response.status === 401) {
                            console.log("Need to refresh tokens");
                        }
                    }
                )

                return true;
            } else {
                logout()
                return false;
            }
        } catch (err) {
            logout()
            return false;
        }
    }

    function logout() {
        setUsername(null);
        setAuthenticated(false);
        setToken(null);
    }


    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, username, token }} >
            {children}
        </AuthContext.Provider>
    )
}