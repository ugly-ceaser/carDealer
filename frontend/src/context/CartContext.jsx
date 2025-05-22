import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // 1. Initialize state from localStorage (or empty array if nothing's there)
    const [cartItems, setCartItems] = useState(() => {
        try {
            const localData = localStorage.getItem('cartItems');
            return localData ? JSON.parse(localData) : [];
        } catch (error) {
            console.error("Error parsing cart items from localStorage:", error);
            return []; // Fallback to empty array in case of parsing error
        }
    });

    const [showCart, setShowCart] = useState(false);

    // 2. Save to localStorage whenever cartItems changes
    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
        } catch (error) {
            console.error("Error saving cart items to localStorage:", error);
        }
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => { // Allow specifying quantity
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity }];
        });
        setShowCart(true); // Optionally open cart when item is added
    };

    const removeFromCart = (productId) => {
        setCartItems(prevItems =>
            prevItems.filter(item => item.id !== productId)
        );
    };

    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            removeFromCart(productId); // Remove item if quantity is less than 1
            return;
        }
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    // 3. Ensure clearCart is available (used in Checkout.js)
    const clearCart = () => {
        setCartItems([]);
        // localStorage will be updated by the useEffect hook for cartItems
    };

    const cartTotal = cartItems.reduce(
        (total, item) => total + (parseFloat(item.price) * item.quantity), // Ensure price is treated as a number
        0
    );

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart, // Make sure clearCart is provided
            cartTotal,
            showCart,
            setShowCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};