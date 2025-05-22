import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import productsApi from '../../api/productApi'; // Import your productsApi
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext'; // Import useAuth for logout on 401

const CatalogDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const { addToCart, cartItems } = useCart();
    const { logout } = useAuth(); // Get logout from AuthContext

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const response = await productsApi.fetchProductById(id);
                // Assuming response.data.product contains the product object
                setProduct(response.data.product);
            } catch (error) {
                console.error('Failed to fetch product:', error);
                if (error.response && error.response.status === 401) {
                    alert('Your session has expired. Please log in again.');
                    logout(); // Redirect to login
                } else {
                    alert(`Failed to load product details: ${error.response?.data?.message || error.message}`);
                }
            }
        };

        getProductDetails();
    }, [id, logout]); // Add logout to dependency array

    const handleAddToCart = () => {
        if (product) {
            addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image_url: product.image_url
            });
            alert(`${product.name} added to cart!`);
        }
    };

    if (!product) {
        return (
            <section className="py-5 text-center">
                <div className="container">
                    <p>Loading product...</p>
                </div>
            </section>
        );
    }


    return (
        <section className="py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">

                        <img
                            src={product.image_url}
                            className="d-block w-100"
                            alt="No Image Available"
                        />
                    </div>

                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p className="text-muted">{product.description}</p>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-primary">€{product.price.toLocaleString('en-US')}</h3>
                            <button
                                className="btn btn-success add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Displaying available product details from your DB schema */}
                        <h5>Details:</h5>
                        <ul className="list-unstyled">
                            <li><strong>Brand:</strong> {product.brand}</li>
                            <li><strong>Model:</strong> {product.model}</li>
                            <li><strong>Year:</strong> {product.year}</li>
                            <li><strong>Color:</strong> {product.color}</li>
                            <li><strong>Mileage:</strong> {product.mileage ? `${product.mileage.toLocaleString()} km` : 'N/A'}</li>
                            <li><strong>Transmission:</strong> {product.transmission}</li>
                            <li><strong>Fuel Type:</strong> {product.fuel_type}</li>
                        </ul>

                        {/* Removed Features and Specifications sections as they are not in your current DB schema/API response */}
                        {/* If you want these, you'll need to add them to your database and API */}

                        <Link className="btn btn-secondary" to="/catalog">
                            Back To Products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CatalogDetail;
