import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const WorkoutList = () => {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of workouts from the backend
    axios.get('http://localhost:8070/workouts')
      .then(response => {
        setWorkouts(response.data);
      })
      .catch(error => {
        console.error('Error fetching workouts:', error);
        setError('Error fetching workouts. Please try again.');
      });
  }, []);

  const handleDeleteWorkout = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/workouts/${id}`);
      // After deleting, update the list of workouts
      setWorkouts(workouts.filter(workout => workout._id !== id));
    } catch (error) {
      console.error('Error deleting workout:', error);
      setError('Error deleting workout. Please try again.');
    }
  };

  // Function to calculate overall calories for a workout
  const calculateOverallCalories = (exercises) => {
    return exercises.reduce((totalCalories, exercise) => totalCalories + (exercise.approximateCalories || 0), 0);
  };

  // Filter workouts based on search term
  const filteredWorkouts = workouts.filter(workout =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='mt-10 container'>

      <div className="header">
        <h2 className="text-2xl font-bold mb-4">Workout List</h2>
        <Link to="/admin/dashboard/ExerciseList" className="green-button">
          <button>View Exercises</button>
        </Link>
      </div>

      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <div className="search-container mb-4">
        <input
          type="text"
          id="searchWorkout"
          placeholder="Search by workout name..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredWorkouts.map(workout => (
          <div key={workout._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">{workout.description}</p>
                <br></br>
                <ul>
                {workout.exercises.map((exercise, index) => (
  <li key={index}>
    <strong>{index + 1}. {exercise.exname}</strong>   
    Reps: {exercise.reps}, Calories: {exercise.approximateCalories}              
    <a href={exercise.videoUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'red' }}>Watch Video</a>
  </li>
))}

                </ul>
                <p className="card-green">Overall Calories: {calculateOverallCalories(workout.exercises)}</p>

                <button onClick={() => handleDeleteWorkout(workout._id)} className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="container add-workout-button">
        <Link to="/admin/dashboard/WorkoutForm">
          <button className="btn btn-primary">Add Workout</button>
        </Link>
      </div>
    </div>
  );
}

// CSS Styles
const styles = `
.container {
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 20px;
}

.green-button {
  padding: 8px 16px;
  font-size: 14px;
  background-color: #524f4e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.green-button:hover {
  background-color: #2e2b2b;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.col-md-4 {
  flex: 0 0 30%;
  max-width: 30%;
  margin-right: 10px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-body {
  padding: 20px;
  height: 100%; /* Set a fixed height for the card body */
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-text {
  font-size: 1rem;
  color: #333;
  margin-bottom: 10px;
}


.card-green {
  font-size: 1rem;
  color: green;
  margin-bottom: 10px;
}

.btn {
  display: inline-block;
  font-weight: 400;
  color: #212529;
  text-align: center;
  vertical-align: middle;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  text-decoration: none;
}

.btn-primary:hover {
  color: #fff;
  background-color: #0056b3;
  border-color: #0056b3;
  text-decoration: none;
}

.btn-danger {
  color: #00000;
}

.btn-danger:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}
`;

// Create the style tag
const styleTag = document.createElement('style');
styleTag.type = 'text/css';
styleTag.appendChild(document.createTextNode(styles));
document.head.appendChild(styleTag);

export default WorkoutList;
