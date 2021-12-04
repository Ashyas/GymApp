import Schedule from '../../models/schedule';
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
export const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
export const SET_SCHEDULE = 'SET_SCHEDULE';
export const SET_MYSCHEDULE = 'SET_MYSCHEDULE';

export const fetchSchedules = (userId) => {
    return async (dispatch) => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/schedules.json');
        const resData = await response.json();
        const loadedSchedules = [];
        for (const key in resData ) {
            loadedSchedules.push(new Schedule(
                key,
                resData[key].userId,
                resData[key].date,
                resData[key].time,
                resData[key].description,
               )
            );
        }
        dispatch ({type: SET_SCHEDULE, schedules: loadedSchedules, userSchedules: loadedSchedules.filter(Schedule => Schedule.userId === userId ) });
    };
};

export const fetchMySchedules = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/schedules.json');
        const resData = await response.json();
        const loadedSchedules = [];
        for (const key in resData ) {
            loadedSchedules.push(new Schedule(
                key,
                resData[key].userId,
                resData[key].date,
                resData[key].time,
                resData[key].description,
               )
            );
        }
        dispatch ({type: SET_MYSCHEDULE, schedules: loadedSchedules, userSchedules: loadedSchedules.filter(Schedule => Schedule.userId === userId ) });
    };
};

export const deleteSchedule = (scheduleId) => {
    return async dispatch => {
         await fetch(`https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/schedules/${scheduleId}.json`, {
            method: 'DELETE',
        });
    dispatch ({type: DELETE_SCHEDULE, sid: scheduleId });    
  };
};

export const createSchedule= (userId, date, time, description) => {
    return async (dispatch) => {
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/schedules.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: userId,
                date,
                time,
                description
            })
        });

        const resData = await response.json();

        dispatch({
            type: CREATE_SCHEDULE, scheduleData: { scheduleId: resData.name, userId: userId, date, time, description } 
        });
    };
};