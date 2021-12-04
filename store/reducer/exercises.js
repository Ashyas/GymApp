import Exercise from '../../models/exercise';
import { DELETE_EXERCISE, CREATE_EXERCISE,  SET_EXERCISES } from '../action/exercises';

const initialState = {
    availableExercises: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_EXERCISES:
            return {
                availableExercises: action.exercises,
            };
        case CREATE_EXERCISE:
            const newExercise = new Exercise(
                action.exerciseData.trainingId,
                action.exerciseData.userId,
                action.exerciseData.exerciseName,
                action.exerciseData.setsNumber,
                action.exerciseData.repetitionsNumber,
                action.exerciseData.weight,

                );
                return {
                    ...state,
                    availableExercises: state. availableExercises.concat(newExercise),
                };

        case DELETE_EXERCISE:
            return {
                ...state,
                availableExercises: state.availableExercises
                .filter(exercise => exercise.exerciseId !== action.eid),

            };
    } 
    return state;
};
