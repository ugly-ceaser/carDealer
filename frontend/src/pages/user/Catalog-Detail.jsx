import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CatalogDetail = () => {
    const { productId } = useParams(); // from route /product/:productId
    const [product, setProduct] = useState(null);

    useEffect(() => {
        // Replace with your real API or local JSON logic
        fetch(`/api/products/${productId}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => console.error('Failed to fetch product:', err));
    }, [productId]);

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const updatedCart = [...existingCart, product];
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        alert('Product added to cart!');
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
                <div className="row" id="product">
                    <div className="col-md-6">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid rounded shadow-sm"
                        />
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p className="text-muted">{product.description}</p>
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-primary">€{parseFloat(product.price).toLocaleString()}</h3>
                            <button
                                className="btn btn-success"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>

                        <h5>Features:</h5>
                        <ul className="list-unstyled">
                            {product.features?.map((feature, idx) => (
                                <li key={idx}>
                                    <i className="fas fa-check-circle text-success"></i> {feature}
                                </li>
                            ))}
                        </ul>

                        <h5>Specifications:</h5>
                        <ul className="list-unstyled">
                            {Object.entries(product.specs || {}).map(([key, value], idx) => (
                                <li key={idx}>
                                    <strong>{key}:</strong> {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CatalogDetail;
