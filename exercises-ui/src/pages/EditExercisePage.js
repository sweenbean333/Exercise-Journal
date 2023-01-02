import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const EditExercisePage = ({exerciseToUpdate}) => {
    
    const [name, setName] = useState(exerciseToUpdate.name);
    const [reps, setReps] = useState(exerciseToUpdate.reps);
    const [weight, setWeight] = useState(exerciseToUpdate.weight);
    const [unit, setUnit] = useState(exerciseToUpdate.unit);
    const [date, setDate] = useState(exerciseToUpdate.date);

    const navigate = useNavigate();

    const updateExercise = async () => {
        const updatedExercise = {name, reps, weight, unit, date};
        const response = await fetch(`/exercises/${exerciseToUpdate._id}`, {
                        method: 'PUT', 
                        body: JSON.stringify(updatedExercise), 
                        headers: {'Content-type':'application/json'}
        });
        if(response.status === 200){
            alert("Successfully updated the exercise");
        } else {
            alert(`Failed to update exercise`);
        }
        navigate('/');
    }


    return (
        <div>
            <h1>Edit Exercise</h1>
            <input
                type="text"
                value = {name}
                onChange={e => setName(e.target.value)}
            />
            <input
                type="number"
                value = {reps}
                onChange={e => setReps(e.target.value)}
            />
            <input
                type="number"
                value = {weight}
                onChange={e => setWeight(e.target.value)}
            />
            <select value={unit} onChange={e => setUnit(e.target.value)}>
                <option value="lbs">Pounds</option>
                <option value="kgs">Kilograms</option>
            </select>
            <input
                type="text"
                value = {date}
                onChange={e => setDate(e.target.value)}
            />
            <button onClick={updateExercise}>Update Exercise</button>
        </div>
    )
}

export default EditExercisePage