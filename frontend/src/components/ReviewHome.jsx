import React from 'react'

import { Link } from "react-router-dom";

const ProductHome = () => {
    return (
        <div className='px-4 lg:px-24 bg-teal-100 flex items-center '>
        <div className='flex w-full flex-col md:flex-row justify-between items-center gap-12 py-40'>
          {/* left side */}
          <div className='md:w-1/2 space-y-8 h-full'>
            <h2 className='text-5xl font-bold leading-snug text-black'><span className='text-blue-700'>Discover Triumphs, Real Stories That Ignite Your Fitness Journey!</span></h2>
            <h3 className='text-2xl font-bold leading-snug text-black'>Embark on Authentic Journeys:</h3>
                <p className='md:w-4/5'> 
                Delve into Inspirational Experiences from our Energetic Fitness Circle, Sharing Insights on Their K-One Fitness Center Adventure!"
                </p>
            <h3 className='text-2xl font-bold leading-snug text-black'>Transparent Feedback: </h3>
                <p className='md:w-4/5'>Explore honest and transparent reviews from our members, providing firsthand accounts of their experiences with our facilities, instructors, programs, and products.
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
                            <img src="https://blog.thegiftcardcafe.com/wp-content/uploads/2021/07/amazon-review-tool.png" className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h2 className="card-title font-bold" style={{ fontSize: '30px' }}>Reviews & Ratings</h2>
                                    <p className="card-text text-2xl" style={{ marginBottom: '15px' }}>Share Your Feedback</p>
                                    <Link to="/contactUs" className="btn btn-primary" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', transition: 'background-color 0.3s ease' }}>Let's Go</Link> {/* Change href="#" to to="/form" */}
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