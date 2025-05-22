import React from 'react'; // No need for useState, useEffect here anymore for auth state
import { ShoppingCart, Search } from 'lucide-react';
import { Link } from 'react-router-dom'; // useNavigate is not needed directly in header for logout redirect
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // Import useAuth hook

export default function UserHeader() {
    const { setShowSearch } = useSearch();
    const { setShowCart } = useCart();
    const { isAuthenticated, user, logout } = useAuth(); // Get auth state and functions from context

    // userName will now come from the 'user' object in context
    const userName = user?.name || 'User'; // Default to 'User' if name isn't available

    // handleLogout now directly calls the logout function from AuthContext
    const handleLogout = () => {
        logout(); // AuthContext's logout handles clearing token and redirection
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
                        <li className="nav-item">
                            <Link to="/catalog" className="nav-link active" aria-current="page">Catalog</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="#" onClick={() => setShowCart(true)} className="nav-link" aria-current="page">
                                <ShoppingCart />
                            </Link>
                        </li>
                        {isAuthenticated ? (
                            <>
                                <li className="nav-item">
                                    <Link to="#" className="nav-link">Hello, {userName}</Link>
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
                                    <Link to="/" className="nav-link">Login</Link> {/* Changed from /#login to /login */}
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
