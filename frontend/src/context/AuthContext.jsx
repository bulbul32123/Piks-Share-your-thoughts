import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
const API_URL = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check if user is logged in on initial load
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            setLoading(true);
            try {
                const { data } = await axios.get(`${API_URL}/api/auth/me`, { withCredentials: true });
                setUser(data);
            } catch (error) {
                setUser(null);
                toast.error(error.response?.data?.message ||'User not found');
            } finally {
                setLoading(false);
            }
        };

        checkUserLoggedIn();
    }, []);

    // Register user
    const signup = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post(`${API_URL}/api/auth/signup`, userData);

            toast.success('Account created successfully');
            navigate('/login');

            return data;
        } catch (error) {
            setError(error.response?.data?.message || 'Signup failed');
            toast.error(error.response?.data?.message || 'Signup failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Login user
    const login = async (email, password) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password
            }, { withCredentials: true });
            setUser(data.user);

            toast.success('Login successful!');
            navigate('/');

            return data;
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed');
            toast.error(error.response?.data?.message || 'Login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Logout user
    const logout = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
            if (data) {
                setUser(null);
                toast.success('Logged out successfully');
                navigate('/');
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Logout failed');
            toast.error(error.response?.data?.message || 'Logout failed');
            throw error;
        } finally {
            setLoading(false);
    }
}

    // Update user profile
    const updateProfile = async (userData) => {
        try {
            setLoading(true);
            setError(null);

            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('Not authenticated');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            };

            const { data } = await axios.put(
                `${API_URL}/api/auth/update-profile`,
                userData,
                config
            );

            setUser(data.user);
            toast.success('Profile updated successfully');

            return data;
        } catch (error) {
            setError(error.response?.data?.message || 'Update failed');
            toast.error(error.response?.data?.message || 'Update failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Forgot password
    const forgotPassword = async (email) => {
        try {
            setLoading(true);
            setError(null);

            await axios.post(`${API_URL}/api/auth/forgot-password`, { email });

            toast.success('Password reset email sent. Please check your inbox.');

            return true;
        } catch (error) {
            setError(error.response?.data?.message || 'Failed to send reset email');
            toast.error(error.response?.data?.message || 'Failed to send reset email');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Reset password
    const resetPassword = async (token, password) => {
        try {
            setLoading(true);
            setError(null);

            await axios.put(`${API_URL}/api/auth/reset-password/${token}`, {
                password
            });

            toast.success('Password reset successful. You can now login with your new password.');
            navigate('/login');

            return true;
        } catch (error) {
            setError(error.response?.data?.message || 'Password reset failed');
            toast.error(error.response?.data?.message || 'Password reset failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Verify email
    const verifyEmail = async (token) => {
        try {
            setLoading(true);
            setError(null);

            const { data } = await axios.get(`${API_URL}/api/auth/verify-email/${token}`);

            toast.success('Email verified successfully. You can now login.');

            return data;
        } catch (error) {
            setError(error.response?.data?.message || 'Email verification failed');
            toast.error(error.response?.data?.message || 'Email verification failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                error,
                signup,
                login,
                logout,
                updateProfile,
                forgotPassword,
                resetPassword,
                verifyEmail
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};