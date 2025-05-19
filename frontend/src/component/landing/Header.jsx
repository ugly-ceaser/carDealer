import { Link } from 'react-router-dom'
import { useSearch } from '../../context/SearchContext';
import { Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function LandingHeader() {
    const { setShowSearch } = useSearch();
    const { cartItems, setShowCart } = useCart();

    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);


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
                        <button id="search-toggle" class="btn btn-outline-light border-0 ms-3" onClick={() => setShowSearch(true)}>
                            <Search />
                        </button>
                        <button
                            onClick={() => setShowCart(true)}
                            className="btn btn-outline-primary border-0 position-relative"
                        >
                            🛒 Cart
                            {totalItems > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <li className="nav-item">
                            <Link to="/#login" className="nav-link" aria-current="page">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="register" className="nav-link" aria-disabled="true">Register</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}