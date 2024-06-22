// src/ServicesList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ServicesList = ({ onEdit }) => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Assume you store your token in local storage
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/serviceslist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(response.data);
        console.log(response.data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to fetch services.');
      }
    };
    

    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`);
      setServices(services.filter(service => service._id !== id));
    } catch (err) {
      setError('Failed to delete service.');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Services List</h2>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <ul className="space-y-4">
        {services.map(service => (
          <li key={service._id} className="bg-white p-4 rounded-md shadow-md flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{service.name}</h3>
              <p>{service.description}</p>
              <p>${service.price}</p>
              <p>{service.duration} hours</p>
            </div>
            <div className="space-x-2">
              <Link to={`/serviceupdate/${service._id}`}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
              >
                Edit
              </button>
              </Link>
              <button
                onClick={() => handleDelete(service._id)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
