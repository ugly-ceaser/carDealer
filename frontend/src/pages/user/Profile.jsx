import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faCog, faShieldAlt } from '@fortawesome/free-solid-svg-icons';

import '../../styles/profile.css'

function Profile() {
    const handleSubmit = (e, message) => {
        e.preventDefault();
        alert(message);
    };

    const handlePasswordChange = (e) => {
        e.preventDefault();
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        alert('Password changed successfully!');
        e.target.reset();
    };

    return (
        <>
            {/* Profile Header */}
            <section className="profile-header">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-2 text-center">
                            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Profile Avatar" className="profile-avatar" />
                        </div>
                        <div className="col-md-10">
                            <h1>John Doe</h1>
                            <p className="lead mb-0">Member since January 2023</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Profile Content */}
            <div className="container mb-5">
                <div className="row">
                    {/* Profile Navigation */}
                    <div className="col-md-3">
                        <div className="card shadow-sm">
                            <div className="card-body p-0">
                                <div className="nav flex-column profile-nav" id="profile-tabs" role="tablist">
                                    <a className="nav-link active" id="personal-tab" data-bs-toggle="tab" href="#personal" role="tab">
                                        <FontAwesomeIcon icon={faUser} className="me-2" /> Personal Information
                                    </a>
                                    <a className="nav-link" id="orders-tab" data-bs-toggle="tab" href="#orders" role="tab">
                                        <FontAwesomeIcon icon={faShoppingBag} className="me-2" /> Order History
                                    </a>
                                    <a className="nav-link" id="settings-tab" data-bs-toggle="tab" href="#settings" role="tab">
                                        <FontAwesomeIcon icon={faCog} className="me-2" /> Account Settings
                                    </a>
                                    <a className="nav-link" id="security-tab" data-bs-toggle="tab" href="#security" role="tab">
                                        <FontAwesomeIcon icon={faShieldAlt} className="me-2" /> Security
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Content */}
                    <div className="col-md-9">
                        <div className="tab-content" id="profile-tab-content">
                            {/* Personal Information Tab */}
                            <div className="tab-pane fade show active profile-content" id="personal" role="tabpanel">
                                <h2 className="mb-4">Personal Information</h2>
                                <form id="personal-info-form" onSubmit={(e) => handleSubmit(e, 'Personal information updated successfully!')}>
                                    <div className="row mb-3">
                                        <div className="col-md-6">
                                            <label htmlFor="first-name" className="form-label">First Name</label>
                                            <input type="text" className="form-control" id="first-name" defaultValue="John" />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="last-name" className="form-label">Last Name</label>
                                            <input type="text" className="form-control" id="last-name" defaultValue="Doe" />
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" className="form-control" id="email" defaultValue="john.doe@example.com" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone Number</label>
                                        <input type="tel" className="form-control" id="phone" defaultValue="+1 (555) 123-4567" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <textarea className="form-control" id="address" rows="3">123 Luxury Lane, Beverly Hills, CA 90210</textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </form>
                            </div>

                            {/* Order History Tab */}
                            <div className="tab-pane fade profile-content" id="orders" role="tabpanel">
                                <h2 className="mb-4">Order History</h2>
                                <div className="order-card card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title mb-0">Order #12345</h5>
                                            <span className="order-status status-completed">Completed</span>
                                        </div>
                                        <p className="card-text text-muted">Ordered on: January 15, 2023</p>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <p className="mb-0"><strong>Mercedes-Benz S-Class</strong></p>
                                                <p className="text-muted mb-0">Color: Obsidian Black</p>
                                            </div>
                                            <div className="col-md-4 text-md-end">
                                                <p className="mb-0"><strong>€110,000</strong></p>
                                                <a href="#" className="btn btn-sm btn-outline-primary">View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-card card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title mb-0">Order #12346</h5>
                                            <span className="order-status status-pending">Pending</span>
                                        </div>
                                        <p className="card-text text-muted">Ordered on: March 22, 2023</p>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <p className="mb-0"><strong>Mercedes-Benz GLE SUV</strong></p>
                                                <p className="text-muted mb-0">Color: Selenite Grey</p>
                                            </div>
                                            <div className="col-md-4 text-md-end">
                                                <p className="mb-0"><strong>€85,000</strong></p>
                                                <a href="#" className="btn btn-sm btn-outline-primary">View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="order-card card shadow-sm">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h5 className="card-title mb-0">Order #12347</h5>
                                            <span className="order-status status-cancelled">Cancelled</span>
                                        </div>
                                        <p className="card-text text-muted">Ordered on: May 10, 2023</p>
                                        <div className="row">
                                            <div className="col-md-8">
                                                <p className="mb-0"><strong>Mercedes-Benz EQS</strong></p>
                                                <p className="text-muted mb-0">Color: Diamond White</p>
                                            </div>
                                            <div className="col-md-4 text-md-end">
                                                <p className="mb-0"><strong>€125,000</strong></p>
                                                <a href="#" className="btn btn-sm btn-outline-primary">View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Account Settings Tab */}
                            <div className="tab-pane fade profile-content" id="settings" role="tabpanel">
                                <h2 className="mb-4">Account Settings</h2>
                                <form id="account-settings-form" onSubmit={(e) => handleSubmit(e, 'Account settings updated successfully!')}>
                                    <div className="mb-3">
                                        <label htmlFor="language" className="form-label">Language</label>
                                        <select className="form-select" id="language">
                                            <option value="en" defaultValue>English</option>
                                            <option value="es">Spanish</option>
                                            <option value="fr">French</option>
                                            <option value="de">German</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="currency" className="form-label">Currency</label>
                                        <select className="form-select" id="currency">
                                            <option value="usd" defaultValue>USD (€)</option>
                                            <option value="eur">EUR (€)</option>
                                            <option value="gbp">GBP (€)</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="timezone" className="form-label">Timezone</label>
                                        <select className="form-select" id="timezone">
                                            <option value="pst" defaultValue>Pacific Time (PT)</option>
                                            <option value="mst">Mountain Time (MT)</option>
                                            <option value="cst">Central Time (CT)</option>
                                            <option value="est">Eastern Time (ET)</option>
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="email-notifications" defaultChecked />
                                            <label className="form-check-label" htmlFor="email-notifications">Email Notifications</label>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Settings</button>
                                </form>
                            </div>

                            {/* Security Tab */}
                            <div className="tab-pane fade profile-content" id="security" role="tabpanel">
                                <h2 className="mb-4">Security Settings</h2>
                                <form id="security-form" onSubmit={handlePasswordChange}>
                                    <div className="mb-3">
                                        <label htmlFor="current-password" className="form-label">Current Password</label>
                                        <input type="password" className="form-control" id="current-password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="new-password" className="form-label">New Password</label>
                                        <input type="password" className="form-control" id="new-password" />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirm-password" className="form-label">Confirm New Password</label>
                                        <input type="password" className="form-control" id="confirm-password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Change Password</button>
                                </form>

                                <hr className="my-4" />

                                <h3 className="mb-3">Login Sessions</h3>
                                <p className="text-muted mb-3">Manage your active login sessions across different devices.</p>
                                <div className="card shadow-sm mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="mb-0">Current Session</h5>
                                                <p className="text-muted mb-0">Windows 10 • Chrome • New York, USA</p>
                                            </div>
                                            <span className="badge bg-success">Active</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="card shadow-sm mb-3">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5 className="mb-0">iPhone 12</h5>
                                                <p className="text-muted mb-0">iOS 15 • Safari • Los Angeles, USA</p>
                                            </div>
                                            <button className="btn btn-sm btn-outline-danger">End Session</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;