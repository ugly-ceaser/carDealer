import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import usersApi from '../api/userApi'; // Import your usersApi

// Create the Auth Context
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [user, setUser] = useState(null); // State to store user data (e.g., name, email)
    const navigate = useNavigate();

    // Function to handle logout (defined early to be used in refreshUser)
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null); // Clear token state
        setUser(null); // Clear user data state
        navigate('/'); // Redirect to the login page after logout
    }, [navigate]); // navigate is a stable reference, but good practice to include

    // Function to refresh user data from the backend
    const refreshUser = useCallback(async () => {
        if (!token) {
            setUser(null);
            return;
        }
        try {
            const response = await usersApi.getUserProfile();
            // Assuming response.data.user contains the user object with name, email, etc.
            setUser(response['user']);
        } catch (error) {
            console.error("Error refreshing user profile:", error);
            if (error.response && error.response.status === 401) {
                // If unauthorized during refresh, log out the user
                logout();
            }
            // Other errors might just mean the user data couldn't be refreshed,
            // but the token might still be valid for other operations.
        }
    }, [token, logout]); // Dependencies: token (to fetch) and logout (if unauthorized)

    // Effect to initialize user data from token on component mount or token change
    useEffect(() => {
        if (token) {
            try {
                // Decode the token to get user information for immediate display
                // IMPORTANT: This is a client-side decode and should NOT be used for security-sensitive checks.
                // It's purely for displaying user info like name.
                const decodedToken = JSON.parse(atob(token.split('.')[1]));
                // Assuming your token payload has 'name' and 'id'
                setUser({
                    id: decodedToken.id,
                    name: decodedToken.name,
                    email: decodedToken.email // Add other fields as needed
                });
                // Also, attempt to fetch the full user profile from the backend
                // to ensure the data is fresh and authorized.
                refreshUser();
            } catch (e) {
                console.error("Error decoding token or token is invalid:", e);
                // If the token is malformed or invalid, treat as logged out
                logout();
            }
        } else {
            setUser(null); // Clear user data if no token
        }
    }, [token, logout, refreshUser]); // Re-run this effect whenever the token state changes or refreshUser changes

    // Function to handle login
    const login = (newToken, userDataFromApi) => {
        localStorage.setItem('token', newToken);
        setToken(newToken); // Update token state

        if (userDataFromApi) {
            setUser(userDataFromApi);
        } else {
            // If no user data is provided with login, trigger a refresh
            refreshUser();
        }
        navigate('/user/dashboard'); // Example: navigate after login
    };

    // Effect to listen for changes in localStorage (e.g., logout from another tab)
    useEffect(() => {
        const handleStorageChange = (event) => {
            if (event.key === 'token') {
                const currentToken = localStorage.getItem('token');
                if (currentToken !== token) { // Only update if it's actually different
                    setToken(currentToken);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [token]); // Dependency on token to avoid stale closure issues

    // The value provided by the context
    const authContextValue = {
        token,
        user, // Expose the user object
        isAuthenticated: !!token, // Derived from token presence
        login,
        logout,
        refreshUser, // Expose the refreshUser function
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for easy access to AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
