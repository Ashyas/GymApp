import Diet from '../../models/diet';

export const SET_DIET = 'SET_DIET';
export const UPDATE_DIET = 'UPDATE_DIET';
export const CREATE_DIET = 'CREATE_DIET';

export const fetchDiets = (userId) => {
    return async (dispatch)  => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/diets.json');
        const resData = await response.json();
        const loadedDiets = [];
        for (const key in resData ) {
            loadedDiets.push(new Diet(
                key,
                resData[key].userId,
                resData[key].breakfast,
                resData[key].lunch,
                resData[key].dinner,
                resData[key].snacks,
                )
            );
        }
        dispatch ({type: SET_DIET, diets: loadedDiets, loginUserDiet: loadedDiets.find(diet => diet.userId === userId )});
    };
};

export const updateDiet = (dietId, userId, breakfast, lunch, dinner, snacks) => {
    return async (dispatch) => {
        const response = await fetch(`https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/diets/${dietId}.json`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({userId, breakfast, lunch, dinner, snacks})
            });

            dispatch({ type: UPDATE_DIET, uid: userId, dietData : { breakfast, lunch, dinner, snacks } });
    };
};

export const createDiet = (userId, breakfast, lunch, dinner, snacks) => {
    return async (dispatch) => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/diets.json', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId, breakfast, lunch, dinner, snacks})
        });

        const resData = await response.json();
        dispatch({type: CREATE_DIET,  dietData : {  dietId: resData.name, breakfast, lunch, dinner, snacks }});
   };
};
  