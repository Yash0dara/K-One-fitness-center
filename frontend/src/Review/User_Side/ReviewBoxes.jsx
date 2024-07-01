import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

export default function ComplaintsBoxes() {
  return (
    <>
    <Navbar/>
    <div>
      <h1 className="card-title"style={{ color: 'white' }}> Instructor Reviews</h1>
      <p className="card-text" style={{ color: 'white' }}> We would like your review to improve our website. </p>
      <p className="card-text" style={{ color: 'white' }}> We would like your review to improve our website. </p>
    </div>
    <div
        className="contact_form mt-5 flex items-center justify-center bg-cover"
        style={{
          minHeight: '100vh', // Set minimum height to cover the viewport
          backgroundImage: `url('https://img.freepik.com/free-photo/3d-gym-equipment_23-2151114163.jpg')`,
          backgroundSize: 'cover', // Ensure the image covers the entire background
          backgroundPosition: 'center', // Center the background image
        }}
      >
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
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://i.pinimg.com/736x/a6/9f/59/a69f59832bc0ccd4648d3ce206d18384.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h2 className="card-title" style={{ fontSize: '30px' }}>Instructor Reviews</h2>
                <p className="card-text" style={{ marginBottom: '15px' }}>Check out what others are saying about our instructors!</p>
                <Link to="/show_I" className="btn btn-primary" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', transition: 'background-color 0.3s ease' }}>Show Reviews</Link> {/* Change href="#" to to="/form" */}
              </div>
            </div>
          </div>
        </div>
      </div>  

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
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://st2.depositphotos.com/4428871/10056/v/950/depositphotos_100562952-stock-illustration-workout-word-cloud-fitness.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h2 className="card-title" style={{ fontSize: '30px' }}>Workout Reviews</h2>
                <p className="card-text" style={{ marginBottom: '15px' }}>Read reviews about our workout plans!</p>
                <Link to="/show_W" className="btn btn-primary" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', transition: 'background-color 0.3s ease' }}>Show Reviews</Link> {/* Change href="#" to to="/form" */}
              </div>
            </div>
          </div>
        </div>
      </div> 

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
            <div className="card" style={{ width: '18rem' }}>
              <img src="https://scrumorg-website-prod.s3.amazonaws.com/drupal/inline-images/2023-07/product_wordcloud.jpg" className="card-img-top" alt="..." />
              <div className="card-body">
                <h2 className="card-title" style={{ fontSize: '30px' }}>Product Reviews</h2>
                <p className="card-text" style={{ marginBottom: '15px' }}>Explore what others are saying about our products!</p>
                <Link to="/show_p" className="btn btn-primary" style={{ backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', padding: '10px 20px', textDecoration: 'none', transition: 'background-color 0.3s ease' }}>Show Reviews</Link> {/* Change href="#" to to="/form" */}
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
      </>
  );
}
