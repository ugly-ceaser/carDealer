import { useCart } from '../../context/CartContext'; // Import useCart hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router redirect

const Checkout = () => {
    const { cartItems, cartTotal, removeFromCart, clearCart } = useCart();
    const navigate = useNavigate();

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cartItems.length > 0) {
            alert(`Processing payment for ${cartItems.length} item(s) totaling €${cartTotal.toLocaleString()}`);

            navigate('/user/thankyou');
        } else {
            alert('Your cart is empty. Please add items before checking out.');
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
                                {cartItems.length > 0 ? (
                                    <>
                                        <ul className="list-group list-group-flush">
                                            {cartItems.map((item) => ( // No need for index if item.id is unique
                                                <li
                                                    key={item.id} // Use item.id as key for better performance and stability
                                                    className="list-group-item bg-secondary text-white d-flex justify-content-between align-items-center"
                                                >
                                                    <div>
                                                        <strong>{item.name}</strong>
                                                        <br />
                                                        <small>€{parseFloat(item.price).toLocaleString()} x {item.quantity}</small>
                                                    </div>
                                                    <div>
                                                        <span className="me-3">€{(item.price * item.quantity).toLocaleString()}</span>
                                                        <button
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() => removeFromCart(item.id)} // Pass item.id
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
                                            <span className="fs-4">€{cartTotal.toLocaleString()}</span>
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
                                        disabled={cartItems.length === 0} // Use cartItems from context
                                    >
                                        {cartItems.length > 0 // Use cartItems from context
                                            ? `Pay €${cartTotal.toLocaleString()}` // Use cartTotal from context
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
