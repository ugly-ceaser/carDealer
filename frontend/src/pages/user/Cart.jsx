import React, { useEffect, useState } from 'react';

import '../../styles/cart.css'
import { Link } from 'react-router-dom';

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
    }, []);

    const getTotal = () =>
        cartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);

    const handleCheckout = () => {
        alert('Proceeding to checkout...');
    };

    const togglePanel = () => {
        setIsPanelOpen((prev) => !prev);
    };

    return (
        <>
            {/* Main Content */}
            <div className="container mt-5">
                <div className="row">
                    <div className="col-12">
                        <h1 className="mb-4">Shopping Cart</h1>
                        <p className="lead">Your cart contains the following items:</p>

                        <div className="card shadow-sm mb-4">
                            <div className="card-body" id="cart-items-container">
                                {cartItems.length === 0 ? (
                                    <div class="text-center py-5">
                                        <i class="fas fa-shopping-cart fa-4x text-muted mb-3"></i>
                                        <h4>Your cart is empty</h4>
                                        <p class="text-muted">Browse our catalog to find your dream car</p>
                                        <Link to="/user/catalog" class="btn btn-primary mt-3">View Catalog</Link>
                                    </div>
                                ) : (
                                    cartItems.map((item, idx) => (
                                        <div key={idx} className="d-flex justify-content-between border-bottom py-2">
                                            <div>
                                                <strong>{item.name}</strong>
                                                <p className="text-muted mb-0">€{item.price}</p>
                                            </div>
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                style={{ height: '50px', width: 'auto', borderRadius: '5px' }}
                                            />
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <h3>Total: <span>€{getTotal().toLocaleString()}</span></h3>
                            <button className="btn btn-primary btn-lg" onClick={handleCheckout}>
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Overlay and Cart Panel */}
            <div
                className={`overlay ${isPanelOpen ? 'active' : ''}`}
                id="cart-overlay"
                onClick={togglePanel}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    display: isPanelOpen ? 'block' : 'none',
                    zIndex: 1040
                }}
            />

            <div
                className="cart-container"
                id="cart-panel"
                style={{
                    position: 'fixed',
                    top: 0,
                    right: isPanelOpen ? 0 : '-400px',
                    width: '350px',
                    height: '100%',
                    background: '#fff',
                    boxShadow: '-2px 0 5px rgba(0,0,0,0.1)',
                    zIndex: 1050,
                    transition: 'right 0.3s ease-in-out',
                    padding: '1rem'
                }}
            >
                <div className="cart-header d-flex justify-content-between align-items-center mb-3">
                    <h3>Your Cart</h3>
                    <button className="cart-close btn" onClick={togglePanel}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <div className="cart-items" id="sliding-cart-items">
                    {cartItems.map((item, idx) => (
                        <div key={idx} className="d-flex justify-content-between align-items-center border-bottom py-2">
                            <div>
                                <strong>{item.name}</strong>
                                <p className="text-muted mb-0">€{item.price}</p>
                            </div>
                            <img
                                src={item.image}
                                alt={item.name}
                                style={{ height: '40px', borderRadius: '5px' }}
                            />
                        </div>
                    ))}
                </div>

                <div className="cart-footer mt-4">
                    <div className="cart-total d-flex justify-content-between">
                        <span>Total:</span>
                        <span id="sliding-cart-total">€{getTotal().toLocaleString()}</span>
                    </div>
                    <button className="btn btn-primary w-100 mt-3" onClick={handleCheckout}>
                        Checkout
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartPage;
