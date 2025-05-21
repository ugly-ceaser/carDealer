import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

const AuthGuard = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Get isAuthenticated from context

    if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/" replace />; // Assuming '/login' is your login route
    }

    return children;
};

export default AuthGuard;
