import ExerciseList from '../components/ExerciseList';
import { useState, useEffect} from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Homepage({setExerciseToUpdate}) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate()

    const onDelete = async (_id) => {
        const response = await fetch(`/exercises/${_id}`, {method: 'DELETE'});
        
        if (response.status === 204) {
            const newExercises = exercises.filter(exercise => exercise._id !== _id);
            setExercises(newExercises)
        } else {
            console.error('Failed to delete exercise with _id = , status code = ');
        }
    }

    const onEdit = (exercise) => {
        setExerciseToUpdate(exercise);
        navigate('/edit-exercise');
    }
        
    

    const loadExercises = async () => {
        const response = await fetch('/exercises');
        const data = await response.json();
        setExercises(data);
    }

    useEffect( () => {
        loadExercises()
    }, []);

    return (
        <>
            <h2>List of Exercises</h2>
            <ExerciseList  exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/add-exercise">Create an exercise</Link>
        </>
    );
}

export default Homepage;