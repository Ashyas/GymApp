import Schedule from '../../models//schedule';

import { DELETE_SCHEDULE, CREATE_SCHEDULE, SET_SCHEDULE, SET_MYSCHEDULE } from '../action/schedules';

const initialState = {
    availableSchedules: [],
    userSchedules: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SCHEDULE: 
            return {
                availableSchedules: action.schedules,
                userSchedules: action.userSchedules
            };
        case SET_MYSCHEDULE: 
        return {
            availableSchedules: action.schedule,
            userSchedules: action.userSchedules
        };
        case CREATE_SCHEDULE:
             const newSchedule = new Schedule(
                 action.scheduleData.scheduletId,
                 action.scheduleData.userId,
                 action.scheduleData.date,
                 action.scheduleData.time,
                 action.scheduleData.description

                 );
                return {
                    ...state,
                    availableSchedules: state.availableSchedules.concat(newSchedule),
                    userSchedules: state.userSchedules.concat(newSchedule)
                };

        case DELETE_SCHEDULE:
            return {
                ...state,
                userSchedules: state.userSchedules.filter(schedule => schedule.scheduleId !== action.sid),
                availableSchedules: state.availableSchedules.filter(schedule => schedule.scheduleId !== action.sid)
            };
    }
    return state;
};
