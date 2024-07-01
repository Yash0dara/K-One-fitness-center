import React, { useState, useEffect } from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import axios from 'axios';

const BookingRequest = () => {
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8070/bookings');
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/bookings/${id}`);
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const approveBooking = async (id) => {
    try {
      const response = await axios.put(`http://localhost:8070/bookings/approve/${id}`);
      if (response.status === 200) {
        // Update the status locally
        setBookings(bookings.map(booking =>
          booking._id === id ? { ...booking, status: 'Confirmed' } : booking
        ));
      } else {
        console.error('Failed to approve booking:', response.statusText);
      }
    } catch (error) {
      console.error('Error approving booking:', error);
    }
  };

  const filteredBookings = searchQuery
    ? bookings.filter(booking =>
      booking.workoutType.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : bookings;

    return (
      <>
        <div class="h-14 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <h2 className="text-3xl font-semibold text-center bg-gray-500 text-white py-4 mt-20">Booking Requests</h2>
          <div className="flex justify-end px-4 py-2">
            <div className="flex items-center border border-gray-300 rounded-md px-4">
              <input
                type="text"
                placeholder="Search by Workout Type"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 focus:outline-none"
              />
              <SearchIcon className="text-gray-400" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Date</th>
                  <th className="border border-gray-400 px-4 py-2">Time Slot</th>
                  <th className="border border-gray-400 px-4 py-2">Workout Type</th>
                  <th className="border border-gray-400 px-4 py-2">Package</th>
                  <th className="border border-gray-400 px-4 py-2">Status</th>
                  <th className="border border-gray-400 px-4 py-2"></th>
                  <th className="border border-gray-400 px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                    <td className="border border-gray-400 px-4 py-2">{booking.date}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.timeSlot}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.workoutType}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.packageType}</td>
                    <td className="border border-gray-400 px-4 py-2">{booking.status}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {booking.status === 'Pending' && (
                        <button onClick={() => approveBooking(booking._id)} className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600">Approve</button>
                      )}
                      {booking.status === 'Confirmed' && (
                        <span className="text-green-500">Approved</span>
                      )}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <button
                        onClick={() => handleDelete(booking._id)}
                        className={`bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 ${booking.status === 'Confirmed' ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={booking.status === 'Confirmed'}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredBookings.length === 0 && (
            <div className="p-4 text-center">No bookings available.</div>
          )}
        </div>
      </>
    );
    
};

export default BookingRequest;
