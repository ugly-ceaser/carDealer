import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import productImage from '../../assets/images/products/1.jpg';
import { useCart } from '../../context/CartContext';

const CatalogDetail = () => {
    const { productId } = useParams();
    const [product] = useState({
        id: 1,
        name: 'Mercedes-Benz S-Class',
        price: '€120,000',
        description: 'Luxury at its finest. The Mercedes-Benz S-Class offers an unparalleled driving experience, combining cutting-edge technology, comfort, and performance.',
        images: [
            productImage,
            productImage
        ],
        features: [
            'Premium Leather Upholstery',
            '500+ Horsepower Engine',
            'Advanced Navigation System',
            'Safety Assist Technologies'
        ],
        specs: {
            engine: '4.0L V8 Bi-Turbo',
            horsepower: '523 hp',
            torque: '516 lb-ft',
            transmission: '9-Speed Automatic',
            fuelEconomy: '21 MPG City / 28 MPG Highway'
        }
    });
    const [activeIndex, setActiveIndex] = useState(0);
    const { addToCart } = useCart()


    useEffect(() => {
        // Replace with your real API or local JSON logic
        fetch(`/api/products/${productId}`)
            .then((res) => res.json())
            .then((data) => setProduct(data))
            .catch((err) => console.error('Failed to fetch product:', err));
    }, [productId]);

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            price: 120000, // Use actual numeric price
            images: product.images
        });

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
                        <div id="product-carousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                {product.images.map((img, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                                    >
                                        <img
                                            src={img}
                                            className="d-block w-100"
                                            alt={`${product.name} ${index + 1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                            <button
                                className="carousel-control-prev"
                                type="button"
                                data-bs-target="#product-carousel"
                                data-bs-slide="prev"
                                onClick={() => setActiveIndex(prev => (prev > 0 ? prev - 1 : product.images.length - 1))}
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button
                                className="carousel-control-next"
                                type="button"
                                data-bs-target="#product-carousel"
                                data-bs-slide="next"
                                onClick={() => setActiveIndex(prev => (prev < product.images.length - 1 ? prev + 1 : 0))}
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <p className="text-muted">{product.description}</p>

                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h3 className="text-primary">{product.price}</h3>
                            <button
                                className="btn btn-success add-to-cart-btn"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </div>

                        <h5>Features:</h5>
                        <ul className="list-unstyled">
                            {product.features.map((feature, index) => (
                                <li key={index}>
                                    <i className="fas fa-check-circle text-success"></i> {feature}
                                </li>
                            ))}
                        </ul>

                        <h5>Specifications:</h5>
                        <ul className="list-unstyled">
                            <li><strong>Engine:</strong> {product.specs.engine}</li>
                            <li><strong>Horsepower:</strong> {product.specs.horsepower}</li>
                            <li><strong>Torque:</strong> {product.specs.torque}</li>
                            <li><strong>Transmission:</strong> {product.specs.transmission}</li>
                            <li><strong>Fuel Economy:</strong> {product.specs.fuelEconomy}</li>
                        </ul>

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
