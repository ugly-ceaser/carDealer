import React, { useEffect, useState } from 'react';

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(storedCart);
    }, []);

    useEffect(() => {
        const totalAmount = cart.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotal(totalAmount);
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const removeFromCart = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart.length > 0) {
            alert(`Processing payment for ${cart.length} item(s)`);
            localStorage.removeItem('cart');
            setCart([]);
            window.location.href = 'thankyou.html'; // redirect
        }
    };

    return (
        <section className="py-5">
            <div className="container">
                <h2 className="mb-4 text-center">Secure Checkout</h2>
                <div className="row g-5">
                    {/* Order Summary */}
                    <div className="col-md-5">
                        <div className="card bg-secondary text-white shadow-sm">
                            <div className="card-header">
                                <h5>Order Summary</h5>
                            </div>
                            <div className="card-body">
                                {cart.length > 0 ? (
                                    <>
                                        <ul className="list-group list-group-flush">
                                            {cart.map((item, index) => (
                                                <li
                                                    key={index}
                                                    className="list-group-item bg-secondary text-white d-flex justify-content-between align-items-center"
                                                >
                                                    <div>
                                                        <strong>{item.name}</strong>
                                                        <br />
                                                        <small>€{parseFloat(item.price).toLocaleString()}</small>
                                                    </div>
                                                    <div>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => removeFromCart(index)}
                                                        >
                                                            <i className="fas fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                        <hr />
                                        <p>
                                            <strong>Total:</strong>{' '}
                                            <span className="fs-4">€{total.toLocaleString()}</span>
                                        </p>
                                    </>
                                ) : (
                                    <p className="text-warning">
                                        Your cart is empty. Please add a car before checking out.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div className="col-md-7">
                        <div className="card bg-secondary text-white shadow-sm">
                            <div className="card-header">
                                <h5>Payment Details</h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleCheckout}>
                                    <div className="mb-3">
                                        <label htmlFor="cardName" className="form-label">
                                            Cardholder Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cardName"
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cardNumber" className="form-label">
                                            Card Number
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cardNumber"
                                            maxLength="19"
                                            placeholder="1234 5678 9012 3456"
                                            required
                                        />
                                    </div>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="cardExpiry" className="form-label">
                                                Expiry Date
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cardExpiry"
                                                placeholder="MM/YY"
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="cardCVC" className="form-label">
                                                CVC
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cardCVC"
                                                maxLength="4"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={cart.length === 0}
                                    >
                                        {cart.length > 0
                                            ? `Pay €${total.toLocaleString()}`
                                            : 'Pay'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
