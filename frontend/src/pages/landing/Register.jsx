import { useState } from "react";

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        userRole: "customer",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simple validation
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "First name is required";
        if (!formData.lastName) newErrors.lastName = "Last name is required";
        if (!formData.email) newErrors.email = "Valid email is required";
        if (!formData.phone) newErrors.phone = "Valid phone is required";
        if (!formData.password || formData.password.length < 8)
            newErrors.password = "Password must be at least 8 characters";
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = "Passwords do not match";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            console.log("Form submitted", formData);
            // Handle API call here
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
                                    <div className="row mb-3">
                                        <div className="col-md-6 mb-3 mb-md-0">
                                            <label className="form-label">First Name</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.firstName && "is-invalid"}`}
                                                name="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="invalid-feedback">{errors.firstName}</div>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Last Name</label>
                                            <input
                                                type="text"
                                                className={`form-control ${errors.lastName && "is-invalid"}`}
                                                name="lastName"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                            <div className="invalid-feedback">{errors.lastName}</div>
                                        </div>
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

                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.phone && "is-invalid"}`}
                                            name="phone"
                                            placeholder="(123) 456-7890"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                        />
                                        <div className="invalid-feedback">{errors.phone}</div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">I am a</label>
                                        <select
                                            className="form-select"
                                            name="userRole"
                                            value={formData.userRole}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="customer">Customer</option>
                                            <option value="dealer">Dealer</option>
                                        </select>
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

                                    <button type="submit" className="btn btn-secondary w-100">
                                        Create account
                                    </button>

                                    <div className="text-center mt-3">
                                        <p className="mb-0">
                                            Already have an account?{" "}
                                            <a href="./user/index.html">Sign in</a>
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
