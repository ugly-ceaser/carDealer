import { useState } from "react";
import usersApi from "../../api/userApi"; // Import the users API
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => { // Make handleSubmit async
        e.preventDefault();
        // Simple validation
        const newErrors = {};
        if (!formData.name) newErrors.name = "Full Name is required";
        if (!formData.email) newErrors.email = "Valid email is required";
        if (!formData.password || formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setLoading(true); // Set loading to true before API call
            try {
                // Prepare the data for the API.  Adapt to your API's expected structure
                const userData = {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                };

                // Call the register API function
                const response = await usersApi.register(userData);

                console.log("Registration successful:", response);
                // Handle successful registration (e.g., show a success message, redirect)
                navigate('/');

            } catch (error) {
                console.error("Registration error:", error);
                // Handle registration error (e.g., display error message to the user)
                if (error.response && error.response.data) {
                    setErrors({ api: error.response.data.message }); // Set a general error message
                } else {
                    setErrors({ api: "An error occurred during registration." });
                }

            } finally {
                setLoading(false); // Set loading to false after API call, regardless of result
            }
        }
    };

    return (
        <section className="py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className="card shadow">
                            <div className="card-header bg-secondary text-white">
                                <h2 className="h4 mb-0">Create an account</h2>
                                <p className="mb-0 small">
                                    Enter your information to create your Benz-World account
                                </p>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit} noValidate>
                                    {errors.api && <div className="alert alert-danger">{errors.api}</div>}

                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.name && "is-invalid"}`}
                                            name="name"
                                            placeholder="john.doe@example.com"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="invalid-feedback">{errors.name}</div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className={`form-control ${errors.email && "is-invalid"}`}
                                            name="email"
                                            placeholder="john.doe@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="invalid-feedback">{errors.email}</div>
                                    </div>

                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className={`form-control ${errors.password && "is-invalid"}`}
                                                name="password"
                                                placeholder="••••••••"
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="invalid-feedback">{errors.password}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                className={`form-control ${errors.confirmPassword && "is-invalid"}`}
                                                name="confirmPassword"
                                                placeholder="••••••••"
                                                value={formData.confirmPassword}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="invalid-feedback">{errors.confirmPassword}</div>
                                        </div>
                                    </div>

                                    <button type="submit" className="btn btn-secondary w-100" disabled={loading}>
                                        {loading ? 'Creating Account...' : 'Create account'}
                                    </button>

                                    <div className="text-center mt-3">
                                        <p className="mb-0">
                                            Already have an account?{" "}
                                            <Link to="/">Sign in</Link>  {/* Corrected link */}
                                        </p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RegistrationForm;
