import React from 'react'

import { Link } from "react-router-dom";

const ProductHome = () => {
    return (
        <div className='px-4 lg:px-24 bg-teal-100 flex items-center '>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
          {/* left side */}
          <div className='md:w-1/2 space-y-8 h-full'>
            <h2 className='text-5xl font-bold leading-snug text-black'><span className='text-blue-700'> Hassle-Free Booking System for Fitness Sessions</span></h2>
            <h3 className='text-2xl font-bold leading-snug text-black'>Hassle-Free Booking System for Fitness Sessions:</h3>
                <p className='md:w-4/5'> 
                Streamline your fitness journey with our user-friendly booking system, allowing you to effortlessly reserve spots in classes or schedule personal training sessions. 
                </p>
            <h3 className='text-2xl font-bold leading-snug text-black'>Reserve Your Spot in Popular Classes: </h3>
                <p className='md:w-4/5'> Secure your spot in high-demand classes by easily booking in advance, ensuring you never miss out on your preferred workout sessions.
                </p>
            </div>
            

            {/* right side */}
            <div>
                <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg"
                    style={{
                    border: '1px solid #ccc', // Border color and thickness
                    padding: '20px', // Padding around the form elements
                    borderRadius: '5px', // Rounded corners
                    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', // Box shadow for a subtle 3D effect
                    margin: '20px auto', // Center the box horizontally and add some space around it
                    maxWidth: '800px' // Limit the maximum width of the box
                }}>
                    <div className="row">
                        <div className="col mb-3">
                            <div className="card" style={{ width: '25rem' }}>
                            <img src="https://www.bookitlive.net/content/wp-content/uploads/2021/03/How-does-booking-system-work.jpg" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h2 className="card-title font-bold" style={{ fontSize: '30px' }}>Bookings</h2>
                                    <p className="card-text text-2xl " style={{ marginBottom: '15px' }}>Seamless Reservations for Your Next Sweat Session</p>
                                    <Link to="/ScheduleView" className="btn btn-primary" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', transition: 'background-color 0.3s ease' }}>Let's Go</Link> {/* Change href="#" to to="/form" */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
    
        </div> 
      </div>
      )
}

export default ProductHome