import Diet from '../../models/diet';
 import { SET_DIET, UPDATE_DIET, CREATE_DIET} from '../action/diets'

 const initialState = {
    allDiets: [],
    loginUserDiet: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DIET:
            return {
                allDiets: action.diets,
                loginUserDiet: action.loginUserDiet
            }; 
        case UPDATE_DIET:
            const userIndexDiet = state.allDiets.findIndex(diet => diet.userId === action.uid);
            const updatedUserDiet = new Diet(
                                        action.uid,   
                                        action.dietData.breakfast,
                                        action.dietData.lunch,
                                        action.dietData.dinner,
                                        action.dietData.snacks,
                                        );
            const updatedUserDiets = [...state.allDiets];
            updatedUserDiets[userIndexDiet] = updatedUserDiet;
            return {
                ...state,
                allDiets: updatedUserDiets
            }; 
        case CREATE_DIET:
            const newDiet = new Diet(
                                        action.uid,  
                                        action.dietData.breakfast,
                                        action.dietData.lunch,
                                        action.dietData.dinner,
                                        action.dietData.snacks,
                                        );
            return{
                ...state,
                allDiets: state.allDiets.concat(newDiet)
            };        
    } 
    return state;
};