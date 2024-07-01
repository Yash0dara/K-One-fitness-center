import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';

function ScheduleView() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8070/bookings/');
      setBookings(response.data);
    } catch (error) {
      setError('Error fetching bookings');
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDeleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/bookings/${id}`);
      fetchBookings(); // Refetch bookings after deletion
    } catch (error) {
      setError('Error deleting booking');
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <>
      <Navbar />
  
      <br />
      <br />
      <br />
      <br />
  
      <div className="h-screen bg-center bg-cover" style={{backgroundImage: "url('https://as1.ftcdn.net/v2/jpg/06/06/54/92/1000_F_606549277_BMzgu4QoNfqHDkmUgngJrFHuxZXvkS7d.jpg')"}}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-white">Booking Schedule</h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="overflow-x-auto">
            <table className="w-full table-auto bg-gray-200">
              <thead>
                <tr className="bg-blue-200">
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Time Slot</th>
                  <th className="px-4 py-2">Workout Type</th>
                  <th className="px-4 py-2">Package Type</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id} className="border-b border-blue-200 hover:bg-blue-100">
                    <td className="px-4 py-2">{booking.date}</td>
                    <td className="px-4 py-2">{booking.timeSlot}</td>
                    <td className="px-4 py-2">{booking.workoutType}</td>
                    <td className="px-4 py-2">{booking.packageType}</td>
                    <td className="px-4 py-2">{booking.status}</td>
                    <td className="px-4 py-2">
                      <button onClick={() => handleDeleteBooking(booking._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-center mt-8">
            <Link to="/MakeBooking">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded">
                Make Booking
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
  
  
}

export default ScheduleView;
