import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as Exercises from './exercises_model.mjs';
import expressValidator from 'express-validator'

const app = express();
const PORT = process.env.PORT;

const { body, validationResult, check} = expressValidator
const isDateValid = (date) => {
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}



// Create Exercise(s)
app.use(express.json());
app.post('/exercises' , 
     // Name prop must contain at least one character
        body('name').isLength({min: 1}),
    // Reps must be greater than 0
        body('reps').isInt({min: 1}),
    // Weight must be greater than 0
        body('weight').isInt({min: 1}),
    // unit must be the string either kgs or lbs
        body('unit').isIn(["lbs", "kgs"]),
    // Date must be in string format MM-DD-YYYY
        body('date').custom((value) => {
            if (!isDateValid(value)) {
                throw new Error("Invalid date");
            }
            return true;
        }),

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             res.status(400).contentType("application/json").json({Error: "Invalid request"});
        } else {
            const exercise = await Exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
            res.status(201).contentType('application/json').send(exercise)
        }
         
}));

//Retrieve All Exercise(s)
app.get("/exercises", asyncHandler(async (req, res) => {
    const filter = {}
    const result = await Exercises.getExercise(filter)
    res.status(200).contentType('application/json').send(result);
}));

// Retrieve an exercise by id
app.get("/exercises/:_id", asyncHandler(async (req, res) => {
    const exerciseId = req.params._id;
    const exercise = await Exercises.findExerciseById(exerciseId)
    if (exercise !== null) {
       return res.status(200).contentType('application/json').json(exercise)
    } else {
        res.status(404).json({Error : "Not found"}).contentType("application/json")
    }
}))

// Update Exercise
app.put('/exercises/:_id' , 
    // Validate properties
     // Name prop must contain at least one character
        body('name').isLength({min: 1}),
    // Reps must be greater than 0
        body('reps').isInt({min: 1}),
    // Weight must be greater than 0
        body('weight').isInt({min: 1}),
    // unit must be the string either kgs or lbs
        body('unit').isIn(["lbs", "kgs"]),
    // Date must be in string format MM-DD-YYYY
        body('date').custom((value) => {
            if (!isDateValid(value)) {
                throw new Error("Invalid date");
            }
            return true;
        }),

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        // Check if body request is valid
        if (!errors.isEmpty()) {
            return res.status(400).contentType("application/json").json({Error: "Invalid request"});
        }  else {
            // Determine if exercise with specified _id is valid. If so, update the properties of the exercise
            const exerciseId = req.params._id
            const exercise = await Exercises.findExerciseById(exerciseId)
            if (exercise === null) {
                return res.status(400).contentType('application/json').send({Error: "Invalid request"})
            } else {
                const update = {};
                if (req.body.name !== undefined) {
                    update.name = req.body.name
                }
                if (req.body.reps !== undefined) {
                    update.reps = req.body.reps
                }
                if (req.body.weight !== undefined) {
                    update.weight = req.body.weight
                }
                if (req.body.unit !== undefined) {
                    update.unit = req.body.unit
                }
                if (req.body.date !== undefined) {
                    update.date = req.body.date
                }
                const response = await Exercises.updateExercise({_id: exerciseId}, update)
                const updatedExercise = await Exercises.findExerciseById(exerciseId)
                res.status(200).contentType('application/json').send(updatedExercise)
            }
            
        }
         
}));

// Delete Exercises(s)
app.delete('/exercises/:_id', asyncHandler(async (req, res) => {
    const exerciseId = req.params._id
    const user = await Exercises.findExerciseById(exerciseId)
    if (user === null) {
        return res.status(404).contentType('application/json').json({Error: "Not found"})
    }
    const response = await Exercises.deleteExercise({_id: exerciseId})
    res.status(204).send()
}));


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});