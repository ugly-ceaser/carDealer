import { useState, useEffect } from 'react';
import { useSearch } from '../../context/SearchContext';
import defaultProductImage from '../../assets/images/products/1.jpg';
import { Link } from 'react-router-dom';
import productsApi from '../../api/productApi';

const Catalog = () => {
    const { showSearch, setShowSearch } = useSearch();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [color, setColor] = useState('');
    const [transmission, setTransmission] = useState('');
    const [fuel_type, setFuelType] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await productsApi.fetchAllProducts();
                setProducts(response.data.products);
                setFilteredProducts(response.data.products);
            } catch (err) {
                setError(err.message || 'Failed to fetch products');
                console.error("Error fetching products:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const filters = {};
        if (brand) filters.brand = brand;
        if (model) filters.model = model;
        if (minPrice) filters.price = `>=${minPrice}`; // Backend needs to handle price ranges
        if (maxPrice) filters.price = filters.price ? `${filters.price},<=${maxPrice}` : `<=${maxPrice}`; // More complex range handling might be needed
        if (color) filters.color = color;
        if (transmission) filters.transmission = transmission;
        if (fuel_type) filters.fuel_type = fuel_type;

        try {
            const response = await productsApi.filterProducts(filters);
            setFilteredProducts(response.data.products);
        } catch (err) {
            setError(err.message || 'Failed to filter products');
            setFilteredProducts([]);
            console.error("Error filtering products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleNameSearch = async (e) => {
        setName(e.target.value);
        if (e.target.value) {
            setLoading(true);
            setError(null);
            try {
                const response = await productsApi.searchProducts(e.target.value);
                setFilteredProducts(response.data.products);
            } catch (err) {
                setError(err.message || 'Failed to search products');
                setFilteredProducts([]);
                console.error("Error searching products:", err);
            } finally {
                setLoading(false);
            }
        } else {
            // If the search input is empty, reset to all products
            setFilteredProducts(products);
        }
    };

    const handleReset = () => {
        setName('');
        setBrand('');
        setModel('');
        setMinPrice('');
        setMaxPrice('');
        setColor('');
        setTransmission('');
        setFuelType('');
        setFilteredProducts(products);
    };

    if (loading) {
        return (
            <section className="py-5">
                <div className="container">
                    <p>Loading products...</p>
                </div>
            </section>);
    }

    if (error) {
        return (
            <section className="py-5">
                <div className="container">
                    <p>No produts to display</p>
                </div>
            </section>);
    }

    return (
        <div>
            <aside className={`search-sidebar ${showSearch ? 'active' : ''}`}>
                <div className="d-flex justify-content-between align-items-center m-2">
                    <h5 className="mb-0">Search Products</h5>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowSearch(false)}
                    ></button>
                </div>

                <form id="search-form" onSubmit={handleSearch} className='p-3'>
                    <label className="form-label mt-3">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Product name..."
                        value={name}
                        onChange={handleNameSearch}
                    />

                    <label className="form-label mt-3">Brand</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Brand"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />

                    <label className="form-label mt-3">Model</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Model"
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                    />

                    <label className="form-label mt-3">Price Range</label>
                    <div className="d-flex gap-2">
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Min"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                        <input
                            type="number"
                            className="form-control form-control-sm"
                            placeholder="Max"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>

                    <label className="form-label mt-3">Color</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />

                    <label className="form-label mt-3">Transmission</label>
                    <select
                        className="form-select"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                        {/* Add more transmission options based on your data */}
                    </select>

                    <label className="form-label mt-3">Fuel Type</label>
                    <select
                        className="form-select"
                        value={fuel_type}
                        onChange={(e) => setFuelType(e.target.value)}
                    >
                        <option value="">Select</option>
                        {/* Add fuel type options based on your data */}
                        <option value="Petrol">Petrol</option>
                        <option value="Diesel">Diesel</option>
                        <option value="Electric">Electric</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>

                    <button type="submit" className="btn btn-primary w-100 mt-3">Filter</button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mt-2"
                        onClick={handleReset}
                    >
                        Reset Filters
                    </button>
                </form>
            </aside>

            {/* Search Results */}
            <section className="py-5">
                <div className="container">
                    <h2 className="mb-4">All Products</h2>
                    <div className="row g-4">
                        {filteredProducts.map((product, index) => (
                            <div className="col-md-6 col-lg-4" key={product.id || index}>
                                <div className="card h-100 shadow-sm hover-card">
                                    <img
                                        src={product.image_url || defaultProductImage}
                                        className="card-img-top"
                                        alt={product.name}
                                        style={{ height: '200px', objectFit: 'cover' }} // Basic styling for image
                                    />
                                    <div className="card-body">
                                        <h3 className="card-title">{product.name}</h3>
                                        <p className="card-text text-muted">{product.description}</p>
                                        <ul className="list-unstyled">
                                            <li><strong>Brand:</strong> {product.brand}</li>
                                            <li><strong>Model:</strong> {product.model}</li>
                                            <li><strong>Year:</strong> {product.year}</li>
                                            <li><strong>Price:</strong> €{product.price}</li>
                                            {product.color && <li><strong>Color:</strong> {product.color}</li>}
                                            {product.mileage !== null && <li><strong>Mileage:</strong> {product.mileage} km</li>}
                                            {product.transmission && <li><strong>Transmission:</strong> {product.transmission}</li>}
                                            {product.fuel_type && <li><strong>Fuel Type:</strong> {product.fuel_type}</li>}
                                            {/* You can display more product details here */}
                                        </ul>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link to={`${product.id}`} className="btn btn-primary">View Details</Link>
                                            <button className="btn btn-success">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProducts.length === 0 && !loading && !error && (
                        <div className="no-results">
                            <h3>No products found matching your criteria</h3>
                            <p className="text-muted">Try adjusting your search parameters</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Catalog;