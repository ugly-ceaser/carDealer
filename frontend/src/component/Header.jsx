import { ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function UserHeader() {
    const { setShowSearch } = useSearch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check for the presence of a token in localStorage on component mount
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const decodedToken = JSON.parse(atob(token.split('.')[1])); // Basic decode - BE CAREFUL WITH SENSITIVE DATA
            setUserName(decodedToken?.name || 'User'); // Adjust based on your token structure
        } else {
            setIsAuthenticated(false);
            setUserName('');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserName('');
        navigate('/login'); // Redirect to the login page after logout
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
            <div className="container">
                <Link to="/" className="navbar-brand">Benz World</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                        </li>
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link to="/user/catalog" className="nav-link active" aria-current="page">Catalog</Link>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav">
                        {isAuthenticated && (
                            <li className="nav-item">
                                <Link to="/user/cart" className="nav-link" aria-current="page">
                                    <ShoppingCart />
                                </Link>
                            </li>
                        )}
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link to="/user/profile" className="nav-link">Hello, {userName}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/user/profile" className="nav-link" aria-current="page">Profile</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="#" onClick={handleLogout} className="nav-link" aria-disabled="true">Logout</Link>
                                </li>
                                <button id="search-toggle" className="btn btn-outline-light border-0 ms-3" onClick={() => setShowSearch(true)}>
                                    <Search />
                                </button>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link to="/#login" className="nav-link">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/register" className="nav-link">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}