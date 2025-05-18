import { SearchCheck } from 'lucide-react';
import React, { useState } from 'react';

const Search = () => {
    const [formData, setFormData] = useState({
        searchName: '',
        minPrice: '',
        maxPrice: '',
        engine: '',
        horsepower: '',
        transmission: '',
        safety: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const increasePrice = (field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: Number(prev[field] || 0) + 400,
        }));
    };

    const resetForm = () => {
        setFormData({
            searchName: '',
            minPrice: '',
            maxPrice: '',
            engine: '',
            horsepower: '',
            transmission: '',
            safety: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add search logic here
        console.log("Search submitted:", formData);
    };

    return (
        <>
            {/* Search Section */}
            <section className="search-container py-5 bg-dark text-white">
                <div className="container">
                    <h1 className="mb-4">Search Cars</h1>
                    <form onSubmit={handleSubmit} className='mb-10'>
                        <div className="align-items-end row g-3">
                            <div className="col-md-6">
                                <div className="input-group">
                                    <span className="input-group-text">
                                        <SearchCheck />
                                    </span>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="searchName"
                                        placeholder="Search by car name..."
                                        value={formData.searchName}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="price-range">
                                    <label className="form-label">Price Range:</label>
                                    <div className="d-flex align-items-center">
                                        <button
                                            type="button"
                                            className="btn btn-outline-success btn-sm me-2"
                                            onClick={() => increasePrice('minPrice')}
                                        >
                                            +400
                                        </button>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm me-2"
                                            id="minPrice"
                                            placeholder="Min"
                                            value={formData.minPrice}
                                            onChange={handleChange}
                                        />
                                        <span className="mx-2">to</span>
                                        <input
                                            type="number"
                                            className="form-control form-control-sm me-2"
                                            id="maxPrice"
                                            placeholder="Max"
                                            value={formData.maxPrice}
                                            onChange={handleChange}
                                        />
                                        <button
                                            type="button"
                                            className="btn btn-outline-success btn-sm"
                                            onClick={() => increasePrice('maxPrice')}
                                        >
                                            +400
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12">
                                <button type="submit" className="btn btn-primary">
                                    Search
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary ms-2"
                                    onClick={resetForm}
                                >
                                    Reset
                                </button>
                            </div>
                        </div>
                    </form>

                    {/* Specs Filter */}
                    <div className="col-12 mt-4">
                        <h5>Search by Specifications</h5>
                        <div className="row g-2">
                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    id="engine"
                                    value={formData.engine}
                                    onChange={handleChange}
                                >
                                    <option value="">Engine Type</option>
                                    <option value="2.0L">2.0L</option>
                                    <option value="3.0L">3.0L</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    id="horsepower"
                                    value={formData.horsepower}
                                    onChange={handleChange}
                                >
                                    <option value="">Horsepower</option>
                                    <option value="255">255 hp</option>
                                    <option value="429">429 hp</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    id="transmission"
                                    value={formData.transmission}
                                    onChange={handleChange}
                                >
                                    <option value="">Transmission</option>
                                    <option value="Automatic">Automatic</option>
                                    <option value="Manual">Manual</option>
                                </select>
                            </div>
                            <div className="col-md-3">
                                <select
                                    className="form-select"
                                    id="safety"
                                    value={formData.safety}
                                    onChange={handleChange}
                                >
                                    <option value="">Safety Feature</option>
                                    <option value="Adaptive Cruise">Adaptive Cruise</option>
                                    <option value="Lane Assist">Lane Assist</option>
                                    <option value="Blind Spot">Blind Spot</option>
                                    <option value="PRE-SAFE">PRE-SAFE</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Results Section */}
            <section className="py-5">
                <div className="container">
                    <h2 className="mb-4">Search Results</h2>
                    <div className="row g-4" id="search-results">
                        {/* Render search results dynamically here */}
                        {/* Example: <CarCard /> */}
                    </div>
                    <div className="text-center text-muted mt-4">
                        <h5>No cars found matching your criteria</h5>
                        <p>Try adjusting your search parameters</p>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Search;
