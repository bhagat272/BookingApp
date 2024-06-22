import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from './redux/slices/userSlice'; // Adjust the path accordingly

const UserList = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if (loading) return <p className="text-center text-blue-500">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    // Add defensive check
    if (!Array.isArray(users)) return <p className="text-center text-yellow-500">Unexpected data format</p>;

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold mb-4 text-center">User List</h1>
            <ul className="space-y-4">
                {users?.map(user => (
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
        </div>
    );
};

export default UserList;
