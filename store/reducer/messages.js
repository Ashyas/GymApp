import { LOAD_MESSAGES, SEND_MESSAGE } from '../action/messages';
  
  initialState = {
    allMessages: [],
    filterMessage: []
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case LOAD_MESSAGES:
        return {
          ...state,
          allMessages: [...state.allMessages, ...action.Messages],
        };
      case SEND_MESSAGE:
        return {
          ...state,
          allMessages: [...state.allMessages, ...action.messageData],
        };
      default:
        return state;
    }
  };