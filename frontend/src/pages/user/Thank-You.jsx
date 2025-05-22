import { ArrowUpRight } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

function ThankYou() {
    const { cartItems, cartTotal } = useCart();
    const [orderId, setOrderId] = useState('');

    useEffect(() => {
        setOrderId('ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, []);

    return (
        // Replaced Tailwind classes with Bootstrap classes for overall layout
        <div className="container-fluid bg-light d-flex align-items-center justify-content-center min-vh-100 py-4 font-sans">
            <div className="card shadow-lg rounded p-4 p-md-5 w-100" style={{ maxWidth: '900px' }}> {/* Added inline style for max-width */}
                <div className="text-center mb-4"> {/* mb-8 changed to mb-4 for Bootstrap spacing */}
                    <svg
                        className="bi bi-check-circle-fill text-success mx-auto mb-3" // Bootstrap success color, mx-auto, mb-3
                        width="64" height="64" // Explicit width/height for SVG
                        fill="currentColor"
                        viewBox="0 0 16 16"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                    </svg>
                    <h1 className="display-4 fw-bold text-dark mb-2">Thank You for Your Order!</h1> {/* Bootstrap display-4, fw-bold */}
                    <p className="lead text-muted">Your order has been successfully placed.</p> {/* Bootstrap lead, text-muted */}
                    <p className="fs-5 fw-semibold mt-4 text-secondary">Order ID: <span className="text-primary">{orderId}</span></p> {/* Bootstrap fs-5, text-primary */}
                </div>

                <div className="mb-4"> {/* mb-8 changed to mb-4 */}
                    <h2 className="h4 fw-semibold text-dark mb-3">Order Summary</h2> {/* Bootstrap h4, fw-semibold */}
                    {cartItems.length > 0 ? (
                        <div className="table-responsive"> {/* Bootstrap for responsive tables */}
                            <table className="table table-bordered table-striped rounded"> {/* Bootstrap table classes */}
                                <thead className="table-light"> {/* Bootstrap table-light for header background */}
                                    <tr>
                                        <th scope="col" className="text-start">Item</th>
                                        <th scope="col" className="text-start">Quantity</th>
                                        <th scope="col" className="text-start">Price</th>
                                        <th scope="col" className="text-start">Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartItems.map((item) => (
                                        <tr key={item.id}>
                                            <td className="text-start">{item.name}</td>
                                            <td className="text-start">{item.quantity}</td>
                                            <td className="text-start">${item.price}</td>
                                            <td className="text-start">${(item.quantity * item.price).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="table-light"> {/* Bootstrap table-light for footer background */}
                                    <tr>
                                        <td colSpan="3" className="text-end fw-bold">Total:</td>
                                        <td className="text-start fw-bold text-success">${cartTotal.toLocaleString()}</td> {/* Bootstrap text-success */}
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    ) : (
                        <p className="text-muted text-center py-5">No items found in your order. This might be a test run, or your cart was empty.</p>
                    )}
                </div>

                <div className="text-center">
                    <p className="text-muted mb-3">
                        You will receive an email confirmation shortly with details of your order.
                    </p>
                    <Link
                        to="/catalog"
                        className="btn btn-primary btn-lg shadow-sm" // Bootstrap button classes
                    >
                        Continue Shopping
                        <ArrowUpRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ThankYou
