import Training from '../../models/training';
export const DELETE_TRAINING = 'DELETE_TRAINING';
export const CREATE_TRAINING = 'CREATE_TRAINING';
export const SET_TRAINING = 'SET_TRAINING';
export const SET_MYTRAINING = 'SET_MYTRAINING';

export const fetchTrainings = (userId) => {
    return async (dispatch) => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/trainings.json');
        const resData = await response.json();
        const loadedTrainings = [];
        for (const key in resData ) {
            loadedTrainings.push(new Training(
                key,
                resData[key].userId,
                resData[key].date
               )
            );
        }
        dispatch ({type: SET_TRAINING, trainings: loadedTrainings, userTrainings: loadedTrainings.filter(Training => Training.userId === userId ) });
    };
};

export const fetchMyTrainings = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/trainings.json');
        const resData = await response.json();
        const loadedTrainings = [];
        for (const key in resData ) {
            loadedTrainings.push(new Training(
                key,
                resData[key].userId,
                resData[key].date
               )
            );
        }
        dispatch ({type: SET_MYTRAINING, trainings: loadedTrainings, userTrainings: loadedTrainings.filter(Training => Training.userId === userId ) });
    };
};

export const deleteTraining = trainingId => {
    return async dispatch => {
         await fetch(`https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/trainings/${trainingId}.json`, {
            method: 'DELETE',
        });
    dispatch ({type: DELETE_TRAINING, tid: trainingId });    
  };
};

export const createTraining = (date,userId) => {
    return async (dispatch) => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/trainings.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date,
                userId: userId
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_TRAINING, trainingData: { trainingId: resData.name, userId: userId, date } 
        });
    };
};