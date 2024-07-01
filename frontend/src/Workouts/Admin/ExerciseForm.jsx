import React, { useState } from 'react';
import axios from 'axios';

function ExerciseForm() {
  const [formData, setFormData] = useState({
    exname: '',
    description: '',
    reps: '',
    imageUrl: '',
    videoUrl: '',
    category: '',
    approximateCalories: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    // Check if the value is numeric and not negative for reps and approximateCalories
    if ((name === 'reps' || name === 'approximateCalories') && (isNaN(value) || parseInt(value) < 0)) {
      // If the value is not numeric or negative, do not update the state
      return;
    }
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData);

    axios.post('http://localhost:8070/exercises/add', formData)
      .then(response => {
        console.log(response.data);
        // Clear the form after successful submission
        setFormData({
          exname: '',
          description: '',
          reps: '',
          imageUrl: '',
          videoUrl: '',
          category: '',
          approximateCalories: ''
        });
      })
      .catch(error => {
        console.error('Error adding exercise:', error.response.data);
      });
  };

  return (
    <div className='mt-10 container'>
      
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Add Exercise</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Exercise name:</label>
            <input type="text" name="exname" value={formData.exname} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Description:</label>
            <input type="text" name="description" value={formData.description} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Repetition:</label>
            <input type="number" name="reps" value={formData.reps} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Image URL:</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Video URL:</label>
            <input type="text" name="videoUrl" value={formData.videoUrl} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Category:</label>
            <input type="text" name="category" value={formData.category} onChange={handleChange} style={styles.input} />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Approximate Calories:</label>
            <input type="number" name="approximateCalories" value={formData.approximateCalories} onChange={handleChange} style={styles.input} />
          </div>
          <button type="submit" style={styles.button}>Add Exercise</button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '20px'
  },
  formContainer: {
    maxWidth: '600px',
    margin: '0 auto'
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default ExerciseForm;
