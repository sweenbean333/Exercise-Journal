import mongoose   from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

// Make connection to a database
const db = mongoose.connection;

// Schema
const exerciseSchema = mongoose.Schema({
    name: {type: String, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    unit: {type: String, required:true},// only values allowed are kgs and lbs
    date: {type: String, required:true}
})

// Model
const Exercise = mongoose.model("Exercise", exerciseSchema)

//  Create Exercise
const createExercise = async (name, reps, weight, unit, date) => {
    const exercise = new Exercise({name:name, reps:reps, weight:weight, unit:unit, date:date})
    return exercise.save()
}

// Get Exercise
const getExercise = async (filter) => {
    const query = Exercise.find(filter)
    return query.exec()
}

// Find Exercise by ID value
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

// Update Exercise
const updateExercise = async(filter, update) => {
    const result = await Exercise.updateOne(filter, update);
    return result.upsertedId
}
// Delete Exercise
const deleteExercise = async(filter) => {
    const result = await Exercise.deleteOne(filter)
    return result.deletedCount
}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// export functions for use
export {createExercise, getExercise, updateExercise, deleteExercise, findExerciseById}