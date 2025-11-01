import { useState, useEffect } from 'react';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            // Simulate an API call to check authentication status
            const response = await fetch('/api/auth/status');
            const data = await response.json();
            setIsAuthenticated(data.isAuthenticated);
            setLoading(false);
        };

        checkAuthStatus();
    }, []);

    const login = async (credentials) => {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        const data = await response.json();
        if (data.success) {
            setIsAuthenticated(true);
        }
        return data;
    };

    const logout = async () => {
        await fetch('/api/auth/logout', {
            method: 'POST',
        });
        setIsAuthenticated(false);
    };

    return { isAuthenticated, loading, login, logout };
};

export default useAuth;