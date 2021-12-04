import Tip from '../../models/tip';
export const DELETE_TIP = 'DELETE_TIP';
export const CREATE_TIP = 'CREATE_TIP';
export const SET_TIP = 'SET_TIP';

export const fetchTips = () => {
    return async (dispatch) => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/tips.json');
        const resData = await response.json();
        const loadedTips = [];
        for (const key in resData ) {
            loadedTips.push(new Tip(
                key,
                resData[key].title,
               )
            );
        }
        dispatch ({type: SET_TIP, tips: loadedTips });
    };
};

export const deleteTip = tipId => {
    return async dispatch => {
         await fetch(`https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/tips/${tipId}.json`, {
            method: 'DELETE',
        });
    dispatch ({type: DELETE_TIP, tid: tipId });    
  };
};

export const createTip = (title) => {
    return async (dispatch) => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/tips.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_TIP, tipData: { tipId: resData.name, title } 
        });
    };
};