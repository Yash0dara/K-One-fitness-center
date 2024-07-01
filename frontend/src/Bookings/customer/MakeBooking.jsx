import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import axios from 'axios'; // Import Axios
import Navbar from '../../components/Navbar';

const MakeBooking = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [workoutType, setWorkoutType] = useState('');
  const [packageType, setPackageType] = useState('');
  const [error, setError] = useState('');

  // Dummy data
  const timeSlots = ['09:00 AM - 10:00 AM', '10:00 AM - 11:00 AM', '11:00 AM - 12:00 PM', '01:00 PM - 02:00 PM', '02:00 PM - 03:00 PM', '03:00 PM - 04:00 PM'];
  const workoutTypes = ['ZUMBA', 'Strength Training', 'Yoga', 'HIIT', 'Aerobics', 'Callisthenics', 'Body weight training'];
  const packages = ['Silver', 'Gold', 'Platinum'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!date || !timeSlot || !workoutType || !packageType) {
      setError('Please fill in all fields.');
      return;
    }

    // Create a booking object
    const bookingData = {
      date,
      timeSlot,
      workoutType,
      packageType
    };

    try {
      // Send booking data to the backend
      await axios.post('http://localhost:8070/bookings', bookingData);

      // Generate PDF
      generatePDF();

      // Redirect to scheduleView page
      navigate('/BookingDetails'); // Replace '/scheduleView' with your desired route
    } catch (error) {
      console.error('Error making booking:', error);
      // Handle error here, e.g., display an error message to the user
    }
  };

  const generatePDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Content for PDF
    const content = `
      Date: ${date}
      Time Slot: ${timeSlot}
      Workout Type: ${workoutType}
      Package: ${packageType}
    `;

    // Add content to PDF
    doc.text(content, 10, 10);

    // Save PDF
    doc.save('booking_details.pdf');
  };

  return (
    <>
      <Navbar />
        <br></br>
        <br />
        <br />
        <br />
        <br />
        <div style={{ backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/05/56/97/36/1000_F_556973653_oZTsLKGHnIZ4v3OxqWqdWTbCXsKmavZv.jpg')", backgroundSize: "cover", backgroundPosition: "center", minHeight: "100vh" }}>
        <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
          <h2 className="text-2xl font-semibold mb-4">Make Booking</h2>
          {error && <p className="text-red-500">{error}</p>}
          <form id="booking-details" onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Date:</label>
              <input type="date" value={date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setDate(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block mb-1">Time Slot:</label>
              <select value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option value="">Select Time Slot</option>
                {timeSlots.map((slot, index) => (
                  <option key={index} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Workout Type:</label>
              <select value={workoutType} onChange={(e) => setWorkoutType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option value="">Select Workout Type</option>
                {workoutTypes.map((type, index) => (
                  <option key={index} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Package:</label>
              <select value={packageType} onChange={(e) => setPackageType(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500">
                <option value="">Select Package</option>
                {packages.map((pkg, index) => (
                  <option key={index} value={pkg}>{pkg}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300">Book Now</button>
          </form>
        </div>
      </div>
    </>
  );
  
  
  
  
};

export default MakeBooking;
