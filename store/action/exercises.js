
import Exercise from '../../models/exercise';

export const DELETE_EXERCISE = 'DELETE_EXERCISE';
export const CREATE_EXERCISE = 'CREATE_EXERCISE';
export const SET_EXERCISES = 'SET_EXERCISES';

export const fetchExercises = () => {
    return async dispatch => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/exercises.json');
        const resData = await response.json();
        const loadedExercises = [];
        for (const key in resData ) {
            loadedExercises.push(new Exercise(
                key,
                resData[key].trainingId,
                resData[key].userId,
                resData[key].exerciseName,
                resData[key].setsNumber,
                resData[key].repetitionsNumber,
                resData[key].weight,

               )
            );
        }
        dispatch ({type: SET_EXERCISES, exercises: loadedExercises });
    };
};

export const deleteExercise= exerciseId => {
    return async dispatch => {
        await fetch(`https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/exercises/${exerciseId}.json`, {
            method: 'DELETE',
        });
    dispatch ({type: DELETE_EXERCISE, eid: exerciseId});    
  };
 };
    
export const createExercise = (trainingId, userId, exerciseName, setsNumber, repetitionsNumber, weight) => {
    return async dispatch => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/exercises.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                trainingId,
                userId,
                exerciseName,
                setsNumber,
                repetitionsNumber,
                weight
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_EXERCISE, exerciseData: { exerciseId: resData.name, trainingId, userId, exerciseName, setsNumber, repetitionsNumber, weight } 
        });
    };
};



