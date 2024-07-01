import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../../components/Navbar";

function MyWorkout() {
  const [ongoingWorkouts, setOngoingWorkouts] = useState([]);
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  const [totalCaloriesBurned, setTotalCaloriesBurned] = useState(0);

  useEffect(() => {
    // Fetch ongoing workouts
    axios.get('http://localhost:8070/workouts?status=ongoing')
      .then(response => {
        setOngoingWorkouts(response.data);
      })
      .catch(error => {
        console.error('Error fetching ongoing workouts:', error);
      });

    // Fetch completed workouts
    axios.get('http://localhost:8070/workouts?status=completed')
      .then(response => {
        setCompletedWorkouts(response.data);
        // Calculate total calories burned by all completed workouts
        const totalCaloriesBurned = response.data.reduce((total, workout) => total + workout.totalCalories, 0);
        setTotalCaloriesBurned(totalCaloriesBurned);
      })
      .catch(error => {
        console.error('Error fetching completed workouts:', error);
      });
  }, []);

  return (
    <div style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp10555921.jpg')" }}>
      <Navbar />
      <br />
      <br />
      <div className="container mx-auto px-4" >
        <h2 className="text-2xl font-semibold mb-4">Ongoing Workouts</h2>
        <div className="grid grid-cols-3 gap-4">
          {ongoingWorkouts.map(workout => (
            <div key={workout._id} className="border rounded-lg p-4" style={{ backgroundColor: 'white' }}>
              <h3 className="text-lg font-semibold mb-2">{workout.name}</h3>
              <p className="text-sm mb-2">{workout.description}</p>
              <ul className="text-sm">
                {workout.exercises.map(exercise => (
                  <li key={exercise._id}>
                    <p className="mb-1">{exercise.name}</p>
                    <p className="mb-1">Repetitions: {exercise.reps}</p>
                    <p className="mb-1">Calories: {exercise.approximateCalories}</p>
                    <a href={exercise.videoUrl} className="btn btn-primary" target="_blank" rel="noopener noreferrer" style={{ backgroundColor: 'red' }}>Watch Video</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        <h2 className="text-2xl font-semibold mb-4">Completed Workouts</h2>
        <table className="table-auto w-full" style={{ backgroundColor: 'white' }}>
          <thead>
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Completed At</th>
            </tr>
          </thead>
          <tbody>
            {completedWorkouts.map(workout => (
              <tr key={workout._id} className="border">
                <td className="border px-4 py-2">{workout.name}</td>
                <td className="border px-4 py-2">{new Date(workout.completedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Button to navigate to MyUserView */}
        <div className="mt-4">
          <Link to="/WorkoutUserView">
            <button className="btn btn-primary">Go to My User View</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyWorkout;
