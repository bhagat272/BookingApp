import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchServiceById, updateService, clearServiceStatus } from './redux/slices/serviceSlice'; // Adjust path as per your project structure
import toast, { Toaster } from 'react-hot-toast';

const UpdateServiceForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { loading, error, selectedService } = useSelector(state => state.service) || {};
  console.log(loading)
  const [formValues, setFormValues] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        await dispatch(fetchServiceById(id));
      } catch (error) {
        console.error('Error fetching service details:', error);
      }
    };

    fetchServiceDetails();
  }, [dispatch, id]);

  // Update formValues whenever selectedService changes
  useEffect(() => {
    if (selectedService) {
      setFormValues({
        name: selectedService.name || '',
        description: selectedService.description || '',
        price: selectedService.price || '',
        duration: selectedService.duration || '',
      });
    }
  }, [selectedService]);

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
      [name]: value,
    });

    // Real-time validation
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        await dispatch(updateService({ id, ...formValues }));
        setSubmitStatus('Service updated successfully!');
        toast.success("Service updated successfully!")
        handleReset();
      } catch (error) {
        console.error('Failed to update service:', error);
        setSubmitStatus('Failed to update service.');
        setErrors({ form: error.message });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleReset = () => {
    setFormValues({
      name: '',
      description: '',
      price: '',
      duration: '',
    });
    setErrors({});
    setTimeout(() => {
      setSubmitStatus('');
    }, 3000);
  };

  useEffect(() => {
    return () => {
      dispatch(clearServiceStatus());
    };
  }, [dispatch]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Toaster />
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Update Service</h2>

        <form onSubmit={handleSubmit}>
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
              placeholder="Enter service duration in hours"
            />
            {errors.duration && <p className="text-red-500 text-sm">{errors.duration}</p>}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rousnded-md focus:outline-none"
              disabled={loading === 'loading'}
            >
              {loading === 'loading' ? 'Updating...' : 'Update'}
            </button>
          </div>

          {submitStatus && <p className="text-center text-green-600 mt-3">{submitStatus}</p>}

        </form>
      </div>
    </div>
  );
};

export default UpdateServiceForm;
