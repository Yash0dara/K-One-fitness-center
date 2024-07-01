import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Select, Textarea, Button } from 'flowbite-react'; // Import Select, Textarea, and Button components from flowbite-react

// StarRating component
const StarRating = ({ starsSelected, onSelectStar }) => {
  const totalStars = 5;
  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span
          key={index}
          className="cursor-pointer"
          style={{
            color: index < starsSelected ? "gold" : "gray",
            fontSize: "40px",
            textShadow: "0px 0px 4px black", // Add black outline
          }}
          onClick={() => onSelectStar(index + 1)}
        >
          ★ {/* Render star symbol */}
        </span>
      ))}
    </div>
  );
};

export default function Product() {
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [stars, setStars] = useState(0);
  const [percent, setPercent] = useState(0);
  const [isDescriptionValid, setIsDescriptionValid] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    // Fetch data or any other initialization logic
  }, []);

  useEffect(() => {
    // Check if the description meets the validation criteria
    setIsDescriptionValid(description.trim().split(/\s+/).length > 4);
  }, [description]);

  function sendData(e) {
    e.preventDefault();

    // Convert numeric stars to emojis
    const starEmojis = Array(stars).fill('⭐️').join('');

    // Calculate percentage based on stars
    let percentage = 20 * stars;

    const newProduct = {
      type: type,
      description: description,
      stars: starEmojis, // Store emojis instead of star symbols
      percent: percentage, // Send calculated percentage
      category: selectedCategory // Store selected category
    };

    axios.post("http://localhost:8070/Product_review/add", newProduct)
      .then(() => {
        alert("Product Review Added");
        // Reload the page to show the added review
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  const handleStarClick = (star) => {
    setStars(star);
    // Calculate percentage based on stars
    let percentage = 20 * star;
    setPercent(percentage);
  };

  function handleOpenEditArea() {
    setType(""); // Clear the type input field when opening edit area
    setEditIndex(null); // Reset edit index
  }

  function handleEditReview(index) {
    setEditIndex(index);
    setType(type); // Set the type for editing
    setDescription(description); // Set the description for editing
  }

  function handleUpdateReview(id) {
    const updatedProduct = {
      type: type,
      description: description,
    };

    axios.put(`http://localhost:8070/Product_review/update/${id}`, updatedProduct)
      .then(() => {
        alert("Product Review Updated");
        window.location.reload(); // Reload the page to show the updated review
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <>
    <Navbar />
      <div className="flex">
        <div className="w-1/4 bg-gray-800 text-white p-4 mt-16">
          <h2 className="text-2xl mb-4">Categories</h2>
          <ul>
            <li>
              <Link to="/show_I" className="block hover:text-gray-300">
                Instructor Reviews
              </Link>
            </li>
            <li>
              <Link to="/show_W" className="block hover:text-gray-300">
                Workout Reviews
              </Link>
            </li>
            <li>
              <Link to="/show_P" className="block hover:text-gray-300">
                Product Reviews
              </Link>
            </li>
          </ul>
        </div>
        <div className="w-3/4">
        <div>
            <br></br>
            <br></br>
          </div>
          <div
            className="contact_form mt-5 flex items-center justify-center bg-cover"
            style={{
              minHeight: '100vh', // Set minimum height to cover the viewport
              backgroundImage: `url('https://img.freepik.com/premium-vector/seamless-pattern-gym-graffiti-style-with-cartoony-characters-design-elements_300579-186.jpg')`,
              backgroundSize: 'cover', // Ensure the image covers the entire background
              backgroundPosition: 'center', // Center the background image
            }}>
            <div className="bg-white bg-opacity-80 border border-gray-300 p-8 rounded-lg shadow-lg"style={{
              border: '5px solid #ccc',
              padding: '20px',
              borderRadius: '5px',
              boxShadow: '0px 0px 10px rgba(0, 0, 0, 5)',
              maxWidth: '800px' // Limit the maximum width of the form
            }}>
              <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '30px'}}>Share about your experience...</h1>
              <form id="contact_form" onSubmit={sendData}>

                <div className="mb-4 text-center">
                  <label htmlFor="exampleFormControlInput1" className="form-label">Product Type</label>
                  <Select
                    id="exampleFormControlInput1"
                    className="form-control rounded-md" // Add rounded corners
                    value={type}
                    onChange={(e) => { setType(e.target.value); }}
                  >
                    <option value="">Select Product Type</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Proteins">Proteins</option>
                    <option value="Gym-Equipments">Gym-Equipments</option>
                  </Select>
                </div>

                <div className="mb-4 text-center">
                  <label htmlFor="exampleFormControlTextarea1" className="form-label">Write your review here</label>
                  <div>
                    <Textarea
                      id="exampleFormControlTextarea1"
                      rows="3"
                      value={description}
                      onChange={(e) => { setDescription(e.target.value); }}
                    />
                    {!isDescriptionValid && (
                      <p className="text-red-500">Description must be at least 5 words</p>
                    )}
                  </div>
                </div>

                {/* New code for star ratings */}
                <div className="mb-4 text-center">
                  <label htmlFor="exampleFormControlInput2" className="form-label">Rate the Product</label>
                  <StarRating
                    starsSelected={stars}
                    onSelectStar={handleStarClick}
                  />
                </div>
                {/* End of new code for star ratings */}

                <div className="mb-4 text-center" style={{ margin: 'auto', width: 'fit-content' }}>
                  {editIndex !== null ? (
                    <button type="button" className="btn btn-primary" onClick={() => handleUpdateReview(editIndex)}>Update</button>
                  ) : (
                    <Button
                      type="submit"
                      className={`bg-${isDescriptionValid ? 'green' : 'red'}-500 hover:bg-${isDescriptionValid ? 'green' : 'red'}-700 text-white font-bold py-2 px-4 rounded`}
                      disabled={!isDescriptionValid} // Disable button if description is invalid
                    >
                      Add
                    </Button>
                  )}
                </div>
                <div>
                  <br></br>
                </div>
                <div className="open_button text-center mb-3">
                  <Link to="/f_product" className="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded inline-block">View Previous Reviews</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}