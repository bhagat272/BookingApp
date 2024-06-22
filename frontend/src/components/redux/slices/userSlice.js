import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    users: [],
    loading: false,
    error: null
};

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
    '/fetchusers',
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("authToken");
            console.log("Token:", token);

            const response = await axios.get(`${import.meta.env.VITE_API_URL}/allusers`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            console.log("API Response:", response.data);  // Log the response

            return response.data.users;
        } catch (error) {
            console.error("Error fetching users:", error);  // Log detailed error
            return rejectWithValue(error.response ? error.response.data : error.message);
        }
    }
);

// Create the user slice
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Define any synchronous reducers if needed
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Error fetching users';
            });
    }
});

// Export actions if any and the reducer
export default userSlice.reducer;
