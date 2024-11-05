import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('academic');
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [isEditingAcademic, setIsEditingAcademic] = useState(false);

    const [userData, setUserData] = useState({
        username: 'KANAGAVEL',
        registrationNumber: 'ABC123',
        email: 'user@example.com',
        phone: '+1234567890',
        gender: 'Male',
        dob: 'January 1, 2000',
        tag: 'Student',
        status: 'Approved',
        profilePicture: 'https://via.placeholder.com/150', // Placeholder for profile picture
    });

    const [academicData, setAcademicData] = useState({
        tenth: '95%',
        twelfth: '93%',
        diploma: 'N/A',
        underGraduate: '8.5 CGPA',
        postGraduate: 'N/A',
        backlogsHistory: 'None',
        currentBacklogs: 'None',
        interestedInPlacement: 'Yes',
        workExperience: '6 months internship',
    });

    const handleEditProfile = () => {
        setIsEditingProfile(true);
    };

    const handleSaveProfile = () => {
        setIsEditingProfile(false);
        // Logic to save user profile data
    };

    const handleEditAcademic = () => {
        setIsEditingAcademic(true);
    };

    const handleSaveAcademic = () => {
        setIsEditingAcademic(false);
        // Logic to save academic data
    };

    const handleChangeProfile = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleChangeAcademic = (e) => {
        const { name, value } = e.target;
        setAcademicData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
            const reader = new FileReader();
            reader.onload = () => {
                setUserData(prevState => ({
                    ...prevState,
                    profilePicture: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please upload a JPEG file.');
        }
    };

    const renderContent = () => {
        if (activeTab === 'academic') {
            return (
                <div className="tabContent">
                    <h2 className="contentHeader">Academic Information</h2>
                    <table className="table">
                        <tbody>
                            {Object.keys(academicData).map((key, index) => (
                                <tr key={index}>
                                    <td className="tableCell"><strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</strong></td>
                                    <td className="tableCell">
                                        {isEditingAcademic ? (
                                            <input
                                                type="text"
                                                name={key}
                                                value={academicData[key]}
                                                onChange={handleChangeAcademic}
                                                className="input"
                                            />
                                        ) : (
                                            academicData[key] || 'N/A'
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="buttonGroup">
                        {isEditingAcademic ? (
                            <button onClick={handleSaveAcademic} className="saveButton">Save</button>
                        ) : (
                            <button onClick={handleEditAcademic} className="editButton">Edit</button>
                        )}
                    </div>
                </div>
            );
        } else if (activeTab === 'additional') {
            return (
                <div className="tabContent">
                    <h2 className="contentHeader">Personal Information</h2>
                    <table className="table">
                        <tbody>
                            {Object.keys(userData).map((key, index) => (
                                <tr key={index}>
                                    <td className="tableCell"><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong></td>
                                    <td className="tableCell">
                                        {isEditingProfile ? (
                                            <input
                                                type="text"
                                                name={key}
                                                value={userData[key]}
                                                onChange={handleChangeProfile}
                                                className="input"
                                            />
                                        ) : (
                                            userData[key]
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="buttonGroup">
                        {isEditingProfile ? (
                            <button onClick={handleSaveProfile} className="saveButton">Save</button>
                        ) : (
                            <button onClick={handleEditProfile} className="editButton">Edit</button>
                        )}
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="profileContainer">
                    <div className="profilePictureContainer">
                        <img src={userData.profilePicture} alt="Profile" className="profilePicture" />
                        {isEditingProfile && (
                            <div className="uploadButtonContainer">
                                <label htmlFor="profile-upload" className="uploadButton">Upload Document</label>
                                <input
                                    id="profile-upload"
                                    type="file"
                                    accept="image/jpeg,image/jpg"
                                    onChange={handleProfilePictureChange}
                                    required
                                    style={{ display: 'none' }} // Hides the default file input
                                />
                            </div>
                        )}
                    </div>
                    <h3 className="username">{userData.username}</h3>
                    <p className="approvalStatus">{userData.status}</p>
                </div>
                <div className="profileDetails">
                    <p><strong>Registration Number:</strong> {userData.registrationNumber}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <p><strong>Gender:</strong> {userData.gender}</p>
                    <p><strong>Date of Birth:</strong> {userData.dob}</p>
                    <p><strong>Tag:</strong> {userData.tag}</p>
                </div>
            </div>
            <div className="mainContent">
                <div className="tabContainer">
                    <button
                        onClick={() => setActiveTab('academic')}
                        className={activeTab === 'academic' ? 'activeTab' : 'tab'}
                    >
                        Academic Information
                    </button>
                    <button
                        onClick={() => setActiveTab('additional')}
                        className={activeTab === 'additional' ? 'activeTab' : 'tab'}
                    >
                        Additional Information
                    </button>
                </div>
                <div className="content">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
