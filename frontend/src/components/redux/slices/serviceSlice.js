// src/features/serviceSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch services from API
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/serviceslist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// New async thunk to fetch service details by ID
export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addService = createAsyncThunk(
  'services/addService',
  async (formData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/services`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, ...formData }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(`${import.meta.env.VITE_API_URL}/services/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return id; // Assuming the API returns a success message or confirmation
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  services: [],
  loading: 'idle',
  error: null,
  selectedService: null
}

console.log(initialState)

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearServiceStatus(state) {
      state.loading = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(addService.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(addService.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.services.push(action.payload); // Assuming the API returns the newly added service
      })
      .addCase(addService.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(updateService.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // Assuming the API returns the updated service, update it in the array
        state.services = state.services.map((service) =>
          service.id === action.payload.id ? action.payload : service
        );
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        
        state.loading = 'succeeded';
        state.selectedService = action.payload;
        console.log(state.selectedService)
         
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
      .addCase(deleteService.pending, (state) => {
        state.loading = 'loading';
        state.error = null;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.services = state.services.filter((service) => service.id !== action.payload.id);
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      });
  },
});

// console.log(initialState)

export const { clearServiceStatus } = serviceSlice.actions;

export default serviceSlice.reducer;
