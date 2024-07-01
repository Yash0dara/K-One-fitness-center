import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WorkoutForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    exercises: []
  });
  const [exercises, setExercises] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of exercises from the backend
    axios.get('http://localhost:8070/exercises')
      .then(response => {
        setExercises(response.data);
      })
      .catch(error => {
        console.error('Error fetching exercises:', error);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = e => {
    const { value } = e.target;
    setFormData({ ...formData, exercises: [...formData.exercises, value] });
  };

  const handleRemoveExercise = index => {
    const updatedExercises = [...formData.exercises];
    updatedExercises.splice(index, 1);
    setFormData({ ...formData, exercises: updatedExercises });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log(formData); 
    try {
      const response = await axios.post('http://localhost:8070/workouts/add', formData);
      console.log(response.data);
      // Clear the form after successful submission
      setFormData({
        name: '',
        description: '',
        exercises: []
      });
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error adding workout:', error.response ? error.response.data : error.message);
      setError('Error adding workout. Please try again.'); // Set error message
    }
  };

  return (
    <div className='mt-10' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <div className="container" style={{ maxWidth: '800px', padding: '20px' }}>
        <h2 className="text-2xl font-bold mb-4">Add Workout</h2>
        {error && <div className="alert alert-danger" role="alert">{error}</div>} {/* Error message */}
        <form onSubmit={handleSubmit} className="max-w-xl">
          <div className="mb-4">
            <label htmlFor="name" className="font-bold mb-1 block">Workout Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="font-bold mb-1 block">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="exercises" className="font-bold mb-1 block">Select Exercises:</label>
            <select
              id="exercises"
              onChange={handleSelectChange}
              multiple
              className="w-full p-3 border border-gray-300 rounded"
            >
              {exercises.map(exercise => (
                <option key={exercise._id} value={exercise._id}>{exercise.exname}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Selected Exercises:</h3>
            <ul className="list-none p-0">
              {formData.exercises.map((exerciseId, index) => {
                const selectedExercise = exercises.find(exercise => exercise._id === exerciseId);
                if (!selectedExercise) return null;
                return (
                  <li key={exerciseId} className="mb-2 border-b border-gray-300 pb-2 flex justify-between items-center">
                    <span className="font-bold">{selectedExercise.exname}</span>
                    <button type="button" onClick={() => handleRemoveExercise(index)} className="ml-2 px-3 py-1 bg-red-500 text-white rounded cursor-pointer">Remove</button>
                  </li>
                );
              })}
            </ul>
          </div>
          <button type="submit" className="btn btn-primary">Add Workout</button>
        </form>
      </div>
    </div>
  );
}

export default WorkoutForm;
