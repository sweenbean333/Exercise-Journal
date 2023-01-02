import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddExercisePage = () => {
    const [name, setName] = useState('');
    const [reps, setReps] = useState(0);
    const [weight, setWeight] = useState(0);
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');
    

    const navigate = useNavigate();

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date};
        const response = await fetch('/exercises', {
                        method: 'POST', 
                        body: JSON.stringify(newExercise), 
                        headers: {'Content-type':'application/json'}
        });
        if(response.status === 201){
            alert("Successfully added the exercise");
        } else {
            alert(`Failed to add exercise `);
        }
        navigate('/');
    }
    return (
        <div className='inputs'>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value = {name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="number"
                value = {reps}
                placeholder="Enter # of reps"
                onChange={e => setReps(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter weight here"
                value = {weight}
                onChange={e => setWeight(e.target.value)}
            />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="lbs">Pounds</option>
                <option value="kgs">Kilograms</option>
            </select>
            <input
                type="text"
                placeholder="Enter date here"
                value = {date}
                onChange={e => setDate(e.target.value)}
            />
            <button onClick={addExercise}>Add Exercise</button>
        </div>
    )
}

export default AddExercisePage