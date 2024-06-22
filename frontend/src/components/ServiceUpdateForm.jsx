import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ServiceUpdateForm = ({ serviceId, onSuccess }) => {
    const {id} = useParams()
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    duration: ''
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  // Fetch the service data on component mount
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Replace with how you store your token
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/services/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });
        setFormValues(response.data);
        console.log(response.data)
      } catch (err) {
        setSubmitStatus('Failed to fetch service data.');
      }
    };

    fetchServiceData();
  }, [serviceId]);

  const validateForm = () => {
    const newErrors = {};
    if (formValues.name.length < 3) newErrors.name = 'Service name must be at least 3 characters long.';
    if (formValues.description.length < 10) newErrors.description = 'Description must be at least 10 characters long.';
    if (formValues.price <= 0) newErrors.price = 'Price must be a positive number.';
    if (formValues.duration < 1) newErrors.duration = 'Duration must be at least 1 hour.';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const token = localStorage.getItem('authToken'); // Replace with how you store your token
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/services/${serviceId}`, formValues, {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        });
        setSubmitStatus('Service updated successfully!');
        setErrors({});
        onSuccess(); // Callback to handle success actions like redirecting or updating parent state
      } catch (err) {
        setSubmitStatus('Failed to update service.');
        if (err.response && err.response.data && err.response.data.error) {
          setErrors({ form: err.response.data.error });
        } else {
          setErrors({ form: 'An error occurred. Please try again later.' });
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Update Service</h2>
        
        <form onSubmit={handleSubmit}>
          
          {/* Service Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Service Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formValues.name}
              onChange={handleChange}
              required
              minLength="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter service name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-medium mb-2">Description</label>
            <textarea
              id="description"
              name="description"
              value={formValues.description}
              onChange={handleChange}
              required
              minLength="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter service description"
              rows="4"
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
          </div>

          {/* Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-700 font-medium mb-2">Price ($)</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formValues.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter service price"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
          </div>

          {/* Duration */}
          <div className="mb-6">
            <label htmlFor="duration" className="block text-gray-700 font-medium mb-2">Duration (hours)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formValues.duration}
              onChange={handleChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter service duration"
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-200"
          >
            Update Service
          </button>
        </form>

        {/* Submission Status */}
        {submitStatus && <p className={`mt-4 text-center text-sm ${submitStatus.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{submitStatus}</p>}
        
        {/* General Form Error */}
        {errors.form && <p className="text-red-500 text-sm mt-4">{errors.form}</p>}
      </div>
    </div>
  );
};

export default ServiceUpdateForm;
