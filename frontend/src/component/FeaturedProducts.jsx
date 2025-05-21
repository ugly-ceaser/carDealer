import { useState, useEffect } from 'react';
import productsApi from '../api/productApi';
import defaultProductImage from '../assets/images/products/1.jpg';
import { Link } from 'react-router-dom';

const FeaturedProducts = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                setLoading(true);
                const response = await productsApi.fetchAllProducts(); // Or fetchFeaturedProducts if you have a dedicated endpoint
                if (response && response.data && response.data.products) {
                    setFeaturedProducts(response.data.products.slice(0, 3)); // Get the first 3 products
                } else {
                    setError("Failed to load featured products.");
                }
            } catch (err) {
                setError(err.message || "Failed to load featured products.");
                console.error("Error fetching featured products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchFeatured();
    }, []);

    if (loading) {
        return (
            <section className="py-5 bg-light">
                <div className="container">
                    <p>Loading featured products...</p>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="py-5 bg-light">
                <div className="container">
                    <p>No products to show!</p>
                </div>
            </section>
        )
    }

    return (
        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-4">Featured Products</h2>
                <div className="row g-4">
                    {featuredProducts.map((product) => (
                        <div className="col-md-4" key={product.id}>
                            <div className="card shadow-sm h-100">
                                <img
                                    src={product.image_url || defaultProductImage}
                                    alt={product.name}
                                    className="card-img-top"
                                    style={{ height: '200px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text text-muted">{product.description && product.description.substring(0, 50)}...</p>
                                    <p className="card-text"><strong>Price:</strong> €{product.price}</p>
                                    <Link to={`/user/catalog/${product.id}`} className="btn btn-primary btn-sm">View Details</Link>
                                </div>
                            </div>
                        </div>
                    ))}
                    {featuredProducts.length === 0 && !loading && !error && (
                        <div className="col-12 text-center">
                            <p>No featured products available.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default FeaturedProducts;