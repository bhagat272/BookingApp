import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CContainer,
  CRow,
  CCol,
  CButton,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CCarousel,
  CCarouselItem,
  CImage,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

const Homepage = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('authToken');
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

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <CContainer className="my-12 text-center bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800">Welcome to Our Booking App</h2>
        <p className="text-gray-600 mt-4">Your one-stop solution to book services easily.</p>
        <CButton color="primary" size="lg" className="mt-6 transition-transform transform hover:scale-105">
          Book a Service
        </CButton>
      </CContainer>

      {/* Services Overview */}
      <CContainer className="my-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Our Services</h3>
        <CRow className="gap-4 justify-center">
          {services.map(service => (
            <CCol md="4" key={service._id} className="mb-6">
              <CCard className="hover:shadow-lg transition-shadow">
                <CCardBody>
                  <CCardTitle className="text-lg font-semibold">{service.name}</CCardTitle>
                  <CCardText className="text-gray-600">{service.description}</CCardText>
                  <CCardText className="text-gray-700">Price: ${service.price}</CCardText>
                  <CCardText className="text-gray-700">Duration: {service.duration} hours</CCardText>
                  <CButton color="primary" className="mt-4 w-full transition-transform transform hover:scale-105">
                    Book Now
                  </CButton>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </CContainer>

      {/* Staff Highlight */}
      <CContainer className="my-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Meet Our Staff</h3>
        <CCarousel controls className="rounded-lg shadow-lg">
          <CCarouselItem>
            <CImage className="d-block w-100" src="staff1.jpg" alt="Staff 1" />
            <div className="carousel-caption bg-gray-800 bg-opacity-50 rounded-lg p-4">
              <h5 className="text-white">John Doe</h5>
              <p className="text-gray-200">Lead Specialist</p>
            </div>
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src="staff2.jpg" alt="Staff 2" />
            <div className="carousel-caption bg-gray-800 bg-opacity-50 rounded-lg p-4">
              <h5 className="text-white">Jane Smith</h5>
              <p className="text-gray-200">Consultant</p>
            </div>
          </CCarouselItem>
          {/* Add more staff as needed */}
        </CCarousel>
      </CContainer>

      {/* Customer Reviews */}
      <CContainer className="my-12">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">What Our Customers Say</h3>
        <CCarousel controls className="rounded-lg shadow-lg">
          <CCarouselItem>
            <CCard className="bg-gray-50 p-6 rounded-lg shadow-md">
              <CCardBody>
                <CCardText className="text-gray-700">
                  "Fantastic service! Highly recommend."
                </CCardText>
                <p className="text-gray-600 mt-2">- Customer A</p>
              </CCardBody>
            </CCard>
          </CCarouselItem>
          <CCarouselItem>
            <CCard className="bg-gray-50 p-6 rounded-lg shadow-md">
              <CCardBody>
                <CCardText className="text-gray-700">
                  "Great experience, will book again!"
                </CCardText>
                <p className="text-gray-600 mt-2">- Customer B</p>
              </CCardBody>
            </CCard>
          </CCarouselItem>
          {/* Add more reviews as needed */}
        </CCarousel>
      </CContainer>

      {/* Footer */}
      <footer className="bg-gray-200 py-6">
        <CContainer>
          <CRow className="justify-between items-center">
            <CCol>
              <p className="text-gray-600">&copy; 2024 Booking App. All rights reserved.</p>
            </CCol>
            <CCol className="flex justify-end">
              <CButton color="link" className="text-gray-700 hover:text-gray-900">Privacy Policy</CButton>
              <CButton color="link" className="ml-4 text-gray-700 hover:text-gray-900">Terms of Service</CButton>
            </CCol>
          </CRow>
        </CContainer>
      </footer>
    </div>
  );
}

export default Homepage;
