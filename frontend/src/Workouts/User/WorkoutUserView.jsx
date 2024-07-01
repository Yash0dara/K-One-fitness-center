import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";

function WorkoutUserView() {
  const [workouts, setWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);

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
    // Check if the workout exists in the state
    const existingWorkout = workouts.find(workout => workout._id === id);
    if (!existingWorkout) {
      setError('Workout not found.');
      return;
    }
    
    try {
      await axios.delete(`http://localhost:8070/workouts/${id}`);
      // After deleting, update the list of workouts
      setWorkouts(workouts.filter(workout => workout._id !== id));
    } catch (error) {
      console.error('Error deleting workout:', error);
      setError('Error deleting workout. Please try again.');
    }
  };

  const handleStartWorkout = async (id) => {
    console.log("Workout ID:", id); // Log the workout ID
    try {
      // Calculate total calories for the workout
      const workout = workouts.find(workout => workout._id === id);
      const totalCalories = calculateOverallCalories(workout.exercises);
  
      // Send a PUT request to update the workout status to "ongoing" and update total calories
      await axios.put(`http://localhost:8070/workouts/ongoing/${id}`, { totalCalories });
  
      // Update the local state or UI accordingly
      // For example, you can display a modal or navigate to a new page to start the workout
      setShowModal(true);
  
      // Optionally, you can fetch the updated workout data if needed
      const response = await axios.get(`http://localhost:8070/workouts/${id}`);
      setSelectedWorkout(response.data);
    } catch (error) {
      console.error('Error starting workout:', error);
      setError('Error starting workout. Please try again.');
    }
  };
  
  

  const handleCompleteExercise = async (workoutId, exerciseId) => {
    try {
      await axios.put(`http://localhost:8070/workouts/${workoutId}/exercises/${exerciseId}/complete`);
      // Update completed exercises state
      setCompletedExercises([...completedExercises, exerciseId]);
    } catch (error) {
      console.error('Error completing exercise:', error);
      setError('Error completing exercise. Please try again.');
    }
  };

  const handleCompleteWorkout = async () => {
    try {
      await axios.put(`http://localhost:8070/workouts/complete/${selectedWorkout._id}`);
      // Update completed workouts state
      
      setCompletedWorkouts([...completedWorkouts, selectedWorkout]);
      setSelectedWorkout(null);
    } catch (error) {
      console.error('Error completing workout:', error);
      setError('Error completing workout. Please try again.');
    }
    
  };

  // Function to calculate overall calories for a workout
  const calculateOverallCalories = (exercises) => {
    let totalCalories = 0;
    exercises.forEach(exercise => {
      totalCalories += exercise.approximateCalories;
    });
    return totalCalories;
  };

  // Filter workouts based on search term
  const filteredWorkouts = workouts.filter(workout =>
    workout.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='mt-10' style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp10555921.jpg')" }}>
      <Navbar/>
      <div className="container">
        <h2 className="text-2xl font-bold mb-4">Workout List</h2>
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
        <div className="workout-list">
          {filteredWorkouts.map(workout => (
            <div key={workout._id} className="workout-item" style={{ width: 'calc(50% - 20px)', float: 'left', marginRight: '20px' }}>
              <div className="workout-card" style={{ border: '1px solid #ccc', borderRadius: '4px', background: 'white' }}>
                <div className="workout-card-body">
                  <h5 className="workout-title">{workout.name}</h5>
                  <p className="workout-description">{workout.description}</p>
                  <p className="workout-calories">Overall Calories: {calculateOverallCalories(workout.exercises)}</p>
                  <button onClick={() => handleStartWorkout(workout._id)}>Start</button>
                </div>
                {selectedWorkout && selectedWorkout._id === workout._id && (
                  <div className="workout-card-body">
                    <h5>Exercises:</h5>
                    <ul className="exercise-list">
                      {workout.exercises.map((exercise,index) => (
                        <li key={exercise._id} className={"exercise-item"}>
                          <div className="exercise-card">
                            <div className="exercise-card-body">
                              <h5 className="exercise-title">{exercise.name}</h5>
                              <h5 className="exercise-title">{index + 1}. {exercise.name}</h5>
                              <p className="exercise-reps">Repetitions: {exercise.reps}</p>
                              <p className="exercise-calories">Calories: {exercise.approximateCalories}</p>
                              <a href={exercise.videoUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'red' }}>Watch Video</a>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <button onClick={handleCompleteWorkout}>Complete Workout</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        <Link to="/MyWorkout">
          <button className="btn btn-primary">My Workout</button>
        </Link>
      </div>
    </div>
  );
}

export default WorkoutUserView;
