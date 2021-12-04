import Tip from '../../models/tip';

import { DELETE_TIP, CREATE_TIP, SET_TIP} from '../action/tips';

const initialState = {
    availableTips: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_TIP: 
            return {
                availableTips: action.tips,
            };
        case CREATE_TIP:
             const newTip = new Tip(
                 action.tipData.tipId,
                 action.tipData.title,
                 );
                return {
                    ...state,
                    availableTips: state.availableTips.concat(newTip),
                };
        case DELETE_TIP:
            return {
                ...state,
                availableTips: state.availableTips.filter(tip => tip.tipId !== action.tid)
            };
    }
    return state;
};
