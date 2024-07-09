import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  fetchServices,
  deleteService,
  clearServiceStatus,
} from "./redux/slices/serviceSlice";
import { useDispatch, useSelector } from "react-redux";

const ServicesList = ({ onEdit }) => {
  const dispatch = useDispatch();

  const { loading, error, services } =
    useSelector((state) => state.service) || {};

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        await dispatch(fetchServices());
      } catch (error) {
        console.error("Error fetching service details:", error);
      }
    };

    fetchServiceDetails();
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteService(id));
      await dispatch(fetchServices());
    } catch (err) {
      console.error("Error deleting service:", err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Services List</h2>
      <Link
        to="/serviceform"
        className="flex justify-center no-underline hover:no-underline mb-2"
      >
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-200">
          Add Services
        </button>
      </Link>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white p-4 rounded-md shadow-md flex flex-col justify-between transform transition-transform duration-200 hover:scale-105"
          >
            <div>
              <h3 className="text-lg font-bold mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.description}</p>
              <p className="text-gray-700 mt-2">Price: ${service.price}</p>
              <p className="text-gray-700">
                Duration: {service.duration} hours
              </p>
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <Link to={`/serviceupdate/${service._id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
