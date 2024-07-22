import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import statement for default export

const initialState = {
  loading: false,
  error: null,
  role: null,
  token: null,
  name: null,
  userId: null,
};

// Async thunk for login
export const login = createAsyncThunk(
  "login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        formData
      );
      return response.data; // Assuming response.data contains the necessary data
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logout: (state) => {
      state.role = null;
      state.token = null;
      state.loading = false;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token } = action.payload;
        state.loading = false;
        state.token = token;
        try {
          // Decode the token to extract role
          const decoded = jwtDecode(token); // Use the correct default import
          console.log(decoded);
          const { role, name } = decoded;
          console.log(decoded);
          console.log(action.payload.token);
          state.name = name;
          console.log(name);
          state.role = role;
          // Save to localStorage
          localStorage.setItem("authToken", token);
          localStorage.setItem("userRole", role);
          localStorage.setItem("name", name);
        } catch (e) {
          console.error("Error decoding token:", e);
          state.error = "Invalid token received";
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

// Export actions and reducer
export const { logout } = LoginSlice.actions;
export default LoginSlice.reducer;
