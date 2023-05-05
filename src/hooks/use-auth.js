import React, { useState, useContext, createContext } from "react";
import { Navigate } from "react-router-dom";
import { baseUrl } from "../util/apiConfig";

const authContext = createContext();

export function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export function RequireAuth({ children }) {
    const { user } = useAuth();
    return user ? children : <Navigate to='/login' replace />;
}

export const useAuth = () => {
    return useContext(authContext);
}

function useProvideAuth() {
    const [ user, setUser ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ isLoading, setIsLoading ] = useState(false);

    const login = (username, password) => {
        setIsLoading(true);
        setError(null);
        fetch(`${baseUrl}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: username, password: password})
        }).then(r => {
            setIsLoading(false);
            if(r.ok) {
                r.json().then((resp) =>{
                    if(resp.success){
                        setUser({username:resp.username, token:resp.token});
                        localStorage.setItem('token', resp.token);
                    }else {
                        setError(resp.err);
                    }
                });
            } else {
                r.json().then((err) => setError(err.msg));
            }
        });
    }

    const signup = (username, password) => {
        setIsLoading(true);
        setError([]);
        fetch(`${baseUrl}/user/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: username, password: password})
        }).then(r => {
            setIsLoading(false);
            if(r.ok) {
                r.json().then((resp) =>{
                    if(resp.success){
                        setUser({username:resp.username, token:resp.token});
                        localStorage.setItem('token', resp.token);
                    }else {
                        setError(resp.err);
                    }
                });
            } else {
                r.json().then((err) => setError(err.msg));
            }
        });
    }

    const logout = () => {
        setUser(null);
        /*
        if(!staySignedIn){
            localStorage.removeItem('token');
        }
        */
       localStorage.removeItem('token');
    }

    const autoLogin = () => {
        const token = localStorage.getItem('token');
        if(token){
            //auto login
        }
    }

    return {
        user,
        login,
        signup,
        logout,
        autoLogin,
        error,
        isLoading,
    }
}