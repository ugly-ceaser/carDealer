import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
    const {
        cartItems,
        showCart,
        setShowCart,
        updateQuantity,
        removeFromCart,
        cartTotal
    } = useCart();

    return (
        <aside className={`cart-sidebar ${showCart ? 'active' : ''}`}>
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <h4>Shopping Cart</h4>
                <button
                    className="btn-close"
                    onClick={() => setShowCart(false)}
                ></button>
            </div>

            <div className="p-3">
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        {cartItems.map(item => (
                            <div key={item.id} className="d-flex mb-3">
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className="img-thumbnail me-2"
                                    style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                />
                                <div className="flex-grow-1">
                                    <h6>{item.name}</h6>
                                    <div className="d-flex align-items-center">
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            className="btn btn-sm btn-outline-secondary"
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                        <span className="ms-2">€{(item.price * item.quantity).toFixed(2)}</span>
                                        <button
                                            className="btn btn-danger btn-sm ms-2"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="border-top pt-3 mt-3">
                            <h5>Total: €{cartTotal.toFixed(2)}</h5>
                            <Link
                                className="btn btn-primary w-100 mt-2"
                                to="/user/checkout"
                            >
                                Checkout
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </aside>
    );
};

export default CartSidebar;