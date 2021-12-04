import { DELETE_USER, SET_USERS, UPDATE_USER } from '../action/users';
import User from '../../models/user';

const initialState = {
    availableUsers: [],
    loginUser: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return {
                availableUsers: action.users,
                loginUser: action.loginUser
            };
        case DELETE_USER :
            return {
                ...state,
                availableUsers: state.availableUsers
                .filter(user => user.userId !== action.uid),

            };  
        case UPDATE_USER:
            const userIndex = state.availableUsers.findIndex(user => user.userId === action.uid);
            const updatedUser = new User(
                                        action.uid,   
                                        action.userData.name,
                                        action.userData.phone,
                                        action.userData.age,
                                        action.userData.weight,
                                        action.userData.height,
                                        action.userData.BMI,
                                        action.userData.scope,
                                        action.userData.fat,
                                        );
            const updatedUserList = [...state.availableUsers];
            updatedUserList[userIndex] = updatedUser;
            return {
                ...state,
                availableUsers: updatedUserList
            };        
    } 
    return state;
};