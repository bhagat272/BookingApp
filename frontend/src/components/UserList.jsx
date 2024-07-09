import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from './redux/slices/userSlice'; // Ensure the path is correct
import { Toaster, toast } from 'react-hot-toast';

const UserList = () => {
    const dispatch = useDispatch();
    const { user, loading, error } = useSelector((state) => state.users); // Corrected to 'users' instead of 'user'
    const [searchQuery, setSearchQuery] = useState('');
    const [showNoUserToast, setShowNoUserToast] = useState(false);
    console.log(user)
    useEffect(() => {
        dispatch(fetchAllUsers());
    }, []);

    // Filter users based on search query
    const filteredUsers = user?.users?.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Show toast notification if no users are found
    useEffect(() => {
        if (searchQuery && filteredUsers.length === 0) {
            setShowNoUserToast(true);
            toast.error("User Not Found");
        } else {
            setShowNoUserToast(false);
        }
    }, [searchQuery, filteredUsers]);

    if (loading) return <p className="text-center text-blue-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    // Defensive check
    if (!Array.isArray(user?.users)) return <p className="text-center text-yellow-500">Unexpected data format</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <Toaster />
            <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by name or email..."
                    className="w-full p-2 border border-gray-300 rounded-lg shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            {filteredUsers?.length > 0 ? (
                <ul className="space-y-4">
                    {filteredUsers.map(user => (
                        <li
                            key={user.id}
                            className="p-4 bg-white shadow rounded-lg hover:bg-gray-100 transition transform hover:scale-105 hover:shadow-lg duration-300"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-semibold">{user.name}</p>
                                    <p className="text-gray-600">{user.email}</p>
                                </div>
                                <button className="text-blue-500 hover:text-blue-100 transition duration-200">
                                    View Profile
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                // Only show message if the search query is present
                searchQuery && <p className="text-center text-red-500">No users found</p>
            )}
        </div>
    );
};

export default UserList;
