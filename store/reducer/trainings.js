import Training from '../../models/training';

import { DELETE_TRAINING, CREATE_TRAINING, SET_TRAINING, SET_MYTRAINING } from '../action/trainings';

const initialState = {
    availableTrainings: [],
    userTrainings: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TRAINING: 
            return {
                availableTrainings: action.trainings,
                userTrainings: action.userTrainings
            };
        case SET_MYTRAINING: 
        return {
            availableTrainings: action.trainings,
            userTrainings: action.userTrainings
        };
        case CREATE_TRAINING:
             const newTraining = new Training(
                 action.trainingData.trainingId,
                 action.trainingData.userId,
                 action.trainingData.date
                 );
                return {
                    ...state,
                    availableTrainings: state.availableTrainings.concat(newTraining),
                    userTrainings: state.userTrainings.concat(newTraining)
                };

        case DELETE_TRAINING:
            return {
                ...state,
                userTrainings: state.userTrainings.filter(training => training.trainingId !== action.tid),
                availableTrainings: state.availableTrainings.filter(training => training.trainingId !== action.tid)
            };
    }
    return state;
};
