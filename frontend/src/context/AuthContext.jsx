// AuthContext.js
import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            const { token } = response.data;
            if (token) {
                localStorage.setItem('token', token);  // Save token in localStorage
                setIsLoggedIn(true);  // Update context state
            }
        } catch (error) {
            throw new Error('Login failed');  // Error handling if needed
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
