import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile, fetchUserProfile, uploadProfilePhoto } from './redux/slices/userSlice';
import { Toaster, toast } from 'react-hot-toast';

const Profile = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.users);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [previewProfilePhoto, setPreviewProfilePhoto] = useState(null);

    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password: ''
            });
            setPreviewProfilePhoto(user.profilePhoto || null);
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfilePhoto(file);
            setPreviewProfilePhoto(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUserProfile(formData))
            .unwrap()
            .then(() => {
                toast.success('Profile updated successfully');
                if (profilePhoto) {
                    const photoData = new FormData();
                    photoData.append('profilePhoto', profilePhoto);
                    dispatch(uploadProfilePhoto(photoData))
                        .unwrap()
                        .then(() => {
                            toast.success('Profile photo updated successfully');
                            setProfilePhoto(null);
                        })
                        .catch(() => {
                            toast.error('Failed to update profile photo');
                        });
                }
            })
            .catch(() => {
                toast.error('Failed to update profile');
            });
    };

    if (loading) return <p className="text-center text-blue-500">Loading...</p>;

    // Check if the error is an object or a string
    const errorMessage = typeof error === 'string' ? error : JSON.stringify(error);

    if (error) return <p className="text-center text-red-500">Error: {errorMessage}</p>;

    return (
        <div className="max-w-xl mx-auto p-6 mt-2 bg-white shadow-md rounded-lg">
            <Toaster />
            <h2 className="text-2xl font-bold mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-gray-700">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="Enter new password (optional)"
                    />
                    <p className="text-sm text-gray-500 mt-2">Leave blank to keep your current password</p>
                </div>
                <div>
                    <label htmlFor="profilePhoto" className="block text-gray-700">Profile Photo</label>
                    <input
                        type="file"
                        id="profilePhoto"
                        name="profilePhoto"
                        onChange={handlePhotoChange}
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        accept="image/*"
                    />
                    {previewProfilePhoto && (
                        <img
                            src={previewProfilePhoto}
                            alt="Profile Preview"
                            className="mt-2 h-20 w-20 object-cover rounded-full"
                        />
                    )}
                </div>
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default Profile;
