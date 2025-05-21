import { useState, useEffect } from 'react'; // Import useState and useEffect
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingBag, faCog, faShieldAlt } from '@fortawesome/free-solid-svg-icons';
import usersApi from '../../api/userApi'; // Import your usersApi
import '../../styles/profile.css'
import { useAuth } from '../../context/AuthContext';

function Profile() {
    const [userData, setUserData] = useState({ // State to hold user data
        name: 'John',
        email: 'john.doe@example.com',
    });

    const [passwordData, setPasswordData] = useState({ // State for password change form
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const { logout, refreshUser } = useAuth(); // Get the logout function from AuthContext


    // Fetch user profile data on component mount
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await usersApi.getUserProfile();
                setUserData(response['user']);
            } catch (error) {
                console.error("Error fetching user profile:", error);
                if (error.response && error.response.status === 401) {
                    // Token removed by interceptor, now trigger logout to redirect
                    alert('Your session has expired. Please log in again.');
                    logout(); // Call logout from AuthContext
                } else {
                    alert(`Failed to fetch user profile: ${error.response?.data?.message || error.message}`);
                }
            }
        };
        fetchUserProfile();
    }, [logout]);

    const handlePersonalInputChange = (e) => {
        const { id, value } = e.target;
        // Map form field IDs to API payload keys
        const updatedKey = {
            'name': 'name',
            'email': 'email',
        }[id];

        if (updatedKey) {
            setUserData(prevData => ({
                ...prevData,
                [updatedKey]: value
            }));
        }
    };

    const handlePasswordInputChange = (e) => {
        const { id, value } = e.target;
        setPasswordData(prevData => ({
            ...prevData,
            [id]: value
        }));
    };

    const handlePersonalSubmit = async (e) => {
        e.preventDefault();
        try {
            // Destructure the parts of userData that your backend expects for update
            const { name, email } = userData;
            // The backend updateProfile endpoint only takes 'name' and 'email' as per your provided code.
            // You might need to adjust your backend to accept more fields or concatenate name here.
            // For now, let's assume 'name' can be constructed from firstName and lastName.
            await usersApi.updateUserProfile({ name, email });
            await refreshUser();
            alert('Personal information updated successfully!');
        } catch (error) {
            console.error("Error updating personal information:", error);
            alert(`Failed to update personal information: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleAccountSettingsSubmit = async (e) => {
        e.preventDefault();
        // For account settings, you would gather the values from the form fields
        // and send them to a new or existing API endpoint for account settings.
        // As you didn't provide an endpoint for this, we'll just show an alert.
        alert('Account settings updated successfully!');
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        const { currentPassword, newPassword, confirmPassword } = passwordData;

        if (newPassword !== confirmPassword) {
            alert('New passwords do not match!');
            return;
        }

        try {
            await usersApi.changePassword({ oldPassword: currentPassword, newPassword: newPassword });
            alert('Password changed successfully!');
            setPasswordData({
                currentPassword: '',
                newPassword: '',
                confirmPassword: ''
            }); // Clear the form
        } catch (error) {
            console.error("Error changing password:", error);
            alert(`Failed to change password: ${error.response?.data?.message || error.message}`);
        }
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
                            <h1>{userData.firstName} {userData.lastName}</h1>
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
                                <form id="personal-info-form" onSubmit={handlePersonalSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input type="text" className="form-control" id="name" value={userData.name} onChange={handlePersonalInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email Address</label>
                                        <input type="email" className="form-control" id="email" value={userData.email} onChange={handlePersonalInputChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save Changes</button>
                                </form>
                            </div>

                            {/* Security Tab */}
                            <div className="tab-pane fade profile-content" id="security" role="tabpanel">
                                <h2 className="mb-4">Security Settings</h2>
                                <form id="security-form" onSubmit={handlePasswordChange}>
                                    <div className="mb-3">
                                        <label htmlFor="current-password" className="form-label">Current Password</label>
                                        <input type="password" className="form-control" id="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="new-password" className="form-label">New Password</label>
                                        <input type="password" className="form-control" id="newPassword" value={passwordData.newPassword} onChange={handlePasswordInputChange} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirm-password" className="form-label">Confirm New Password</label>
                                        <input type="password" className="form-control" id="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordInputChange} />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Change Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Profile;