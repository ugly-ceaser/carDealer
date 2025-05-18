import { useState } from 'react';
import { useSearch } from '../../context/SearchContext';
import productImage from '../../assets/images/products/1.jpg';
import { Link } from 'react-router-dom';


const Catalog = () => {
    const { showSearch, setShowSearch } = useSearch();


    const initialCars = [
        {
            "id": "m001",
            "name": "Mercedes-Benz C-Class",
            "price": 45000,
            "description": "Sporty, elegant, and technologically advanced sedan",
            "images": [
                productImage,
                productImage
            ],
            "specs": {
                "Engine": "2.0L Inline-4 Turbo",
                "Horsepower": "255 hp",
                "Transmission": "9-Speed Automatic",
                "Fuel Economy": "25 MPG City / 35 MPG Highway",
                "Interior": "Leather, Ambient Lighting, Panoramic Roof",
                "Safety": "Adaptive Cruise, Lane Assist, Blind Spot Monitoring"
            },
            "features": ["Premium Leather Upholstery", "Safety Assist Technologies", "Advanced Navigation System", "500+ Horsepower Engine"]
        },
        {
            "id": "m002",
            "name": "Mercedes-Benz E-Class",
            "price": 57000,
            "description": "Luxury midsize sedan offering supreme comfort and cutting-edge technology",
            "images": [
                productImage,
                productImage
            ],
            "specs": {
                "Engine": "2.0L Turbocharged Inline-4",
                "Horsepower": "255 hp",
                "Transmission": "9-Speed Automatic",
                "Fuel Economy": "23 MPG City / 31 MPG Highway",
                "Interior": "MBUX system, Wood Trim, Heated Seats",
                "Safety": "PRE-SAFE, Active Brake Assist"
            },
            "features": ["Premium Leather Upholstery", "Safety Assist Technologies", "Advanced Navigation System", "500+ Horsepower Engine"]
        },
        {
            "id": "m003",
            "name": "Mercedes-Benz S-Class",
            "price": 110000,
            "description": "Flagship luxury sedan known for elegance, power, and comfort",
            "images": [
                productImage,
                productImage
            ],
            "specs": {
                "Engine": "3.0L I6 Turbo with EQ Boost",
                "Horsepower": "429 hp",
                "Transmission": "9-Speed Automatic",
                "Fuel Economy": "20 MPG City / 29 MPG Highway",
                "Interior": "Luxury Leather, OLED Display, Massage Seats",
                "Safety": "DRIVE PILOT, Evasive Steering Assist"
            },
            "features": ["Premium Leather Upholstery", "Safety Assist Technologies", "Advanced Navigation System", "500+ Horsepower Engine"]
        },
        {
            "id": "m004",
            "name": "Mercedes-Benz GLC",
            "price": 52000,
            "description": "Compact luxury SUV with performance and versatility",
            "images": [
                productImage,
                productImage
            ],
            "specs": {
                "Engine": "2.0L Inline-4 Turbo",
                "Horsepower": "255 hp",
                "Transmission": "9-Speed Automatic",
                "Fuel Economy": "22 MPG City / 27 MPG Highway",
                "Interior": "Dual Screens, Power Front Seats, Natural Grain Wood Trim",
                "Safety": "Attention Assist, Blind Spot Assist"
            },
            "features": ["Premium Leather Upholstery", "Safety Assist Technologies", "Advanced Navigation System", "500+ Horsepower Engine"]
        },
        {
            "id": "m005",
            "name": "Mercedes-Benz GLE",
            "price": 70000,
            "description": "Midsize luxury SUV that blends style, tech, and space",
            "images": [
                productImage,
                productImage
            ],
            "specs": {
                "Engine": "2.0L Turbo Inline-4",
                "Horsepower": "255 hp",
                "Transmission": "9-Speed Automatic",
                "Fuel Economy": "20 MPG City / 27 MPG Highway",
                "Interior": "MBUX Dual 12.3-inch Screens, Optional 3rd Row",
                "Safety": "Active Parking Assist, Adaptive Braking"
            },
            "features": ["Premium Leather Upholstery", "Safety Assist Technologies", "Advanced Navigation System", "500+ Horsepower Engine"]
        }
    ]


    const [cars] = useState(initialCars);
    const [filteredCars, setFilteredCars] = useState(initialCars);
    const [name, setName] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [engine, setEngine] = useState('');
    const [horsepower, setHorsepower] = useState('');
    const [transmission, setTransmission] = useState('');
    const [safety, setSafety] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();

        const filtered = cars.filter(car => {
            return (
                car.name.toLowerCase().includes(name.toLowerCase()) &&
                (minPrice === '' || car.price >= Number(minPrice)) &&
                (maxPrice === '' || car.price <= Number(maxPrice)) &&
                (engine === '' || car.engine === engine) &&
                (horsepower === '' || car.horsepower === Number(horsepower)) &&
                (transmission === '' || car.transmission === transmission) &&
                (safety === '' || car.safety === safety)
            );
        });

        setFilteredCars(filtered);
    };

    const handleReset = () => {
        setName('');
        setMinPrice('');
        setMaxPrice('');
        setEngine('');
        setHorsepower('');
        setTransmission('');
        setSafety('');
        setFilteredCars(cars);
    };

    return (
        <div>
            <aside className={`search-sidebar ${showSearch ? 'active' : ''}`}>
                <div className="d-flex justify-content-between align-items-center m-2">
                    <h5 className="mb-0">Search Cars</h5>
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={() => setShowSearch(false)}
                    ></button>
                </div>

                <form id="search-form" onSubmit={handleSearch} className='p-3'>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Car name..."
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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

                    <label className="form-label mt-3">Engine Type</label>
                    <select
                        className="form-select"
                        value={engine}
                        onChange={(e) => setEngine(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="2.0L">2.0L</option>
                        <option value="3.0L">3.0L</option>
                    </select>

                    <label className="form-label">Horsepower</label>
                    <select
                        className="form-select"
                        value={horsepower}
                        onChange={(e) => setHorsepower(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="255">255 hp</option>
                        <option value="429">429 hp</option>
                    </select>

                    <label className="form-label">Transmission</label>
                    <select
                        className="form-select"
                        value={transmission}
                        onChange={(e) => setTransmission(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Automatic">Automatic</option>
                        <option value="Manual">Manual</option>
                    </select>

                    <label className="form-label">Safety Feature</label>
                    <select
                        className="form-select"
                        value={safety}
                        onChange={(e) => setSafety(e.target.value)}
                    >
                        <option value="">Select</option>
                        <option value="Adaptive Cruise">Adaptive Cruise</option>
                        <option value="Lane Assist">Lane Assist</option>
                        <option value="Blind Spot">Blind Spot</option>
                        <option value="PRE-SAFE">PRE-SAFE</option>
                    </select>

                    <button type="submit" className="btn btn-primary w-100 mt-3">Search</button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary w-100 mt-2"
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </form>
            </aside>

            {/* Search Results */}
            <section className="py-5">
                <div className="container">
                    <h2 className="mb-4">All Products</h2>
                    <div className="row g-4">
                        {filteredCars.map((car, index) => (
                            <div className="col-md-6 col-lg-4" key={index}>
                                <div className="card h-100 shadow-sm hover-card">
                                    <img src={productImage} className="card-img-top" alt={car.name} />
                                    <div className="card-body">
                                        <h3 className="card-title">{car.name}</h3>
                                        <p className="card-text text-muted">{car.description}</p>
                                        <ul className="list-unstyled">
                                            {Object.entries(car.specs).map(([key, value]) => (
                                                <li key={key}>
                                                    <strong>{key}:</strong> {value}
                                                </li>
                                            ))}
                                        </ul>
                                        <p className="text-sm"><strong>Price:</strong>: €{car.price}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <Link to={`/catalog/${car.id}`} className="btn btn-primary">View Details</Link>
                                            <button className="btn btn-success">Add to Cart</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredCars.length === 0 && (
                        <div className="no-results">
                            <h3>No cars found matching your criteria</h3>
                            <p className="text-muted">Try adjusting your search parameters</p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Catalog;