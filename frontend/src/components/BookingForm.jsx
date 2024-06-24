import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const BookingForm = () => {
  const { id } = useParams(); // Service ID from URL parameters
  const [name, setName] = useState('');
  const [date, setDate] = useState(''); // Ensure it matches the Date type in your schema
  const [paymentMethod, setPaymentMethod] = useState(''); // State to store selected payment method
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const bookingData = {
      userId: 'someValidUserId', // Replace with actual user ID from your application's auth context
      name,
      Date: new Date(date), // Ensure to convert to Date object
      bookingStatus: 'pending', // Default value from schema
      paymentStatus: 'unpaid', // Default value from schema
      paymentMethod,
      paymentDate: null, // Initially set to null, will be updated as needed
      serviceId: id,
    };

    try {
      const response = await axios.post('http://localhost:8000/api/bookings', bookingData);
      setSuccess('Booking created successfully!');
      setName('');
      setDate('');
      setPaymentMethod('');
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl mt-2 shadow-md overflow-hidden md:max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">Book Service</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Service Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date:
          </label>
          <input
            type="datetime-local"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
            Payment Method:
          </label>
          <select
            id="paymentMethod"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select Payment Method</option>
            <option value="razorpay">Razorpay</option>
            <option value="paytm">Paytm</option>
            <option value="debit_card">Debit Card</option>
            <option value="credit_card">Credit Card</option>
          </select>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading || !paymentMethod}
          >
            {loading ? 'Booking...' : 'Book'}
          </button>
        </div>
        {success && <p className="text-green-600 mt-4">{success}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default BookingForm;
