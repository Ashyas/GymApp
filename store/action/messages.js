export const LOAD_MESSAGES = 'LOAD_MESSAGES';
export const SEND_MESSAGE ='LOAD_MESSAGES';
import Message from '../../models/message';

export const fetchMessages = () => {
    return async (dispatch, getState)  => {
        const userId = getState().auth.userId;
        const response = await fetch('https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/messages.json');
        const resData = await response.json();
        const loadedMessages = [];
        for (const key in resData ) {
            loadedMessages.push(new Message(
                key,
                resData[key].userId,
                resData[key].name,
                resData[key].date,
                resData[key].message,
                )
            );
        }
        dispatch ({ type: LOAD_MESSAGES, Messages : loadedMessages, loginUserMessage: loadedMessages.find(message => message.userId === userId )});
    };
};

export const sendMessage = (userId,name,date,message) => {
    return async (dispatch) => {         
        const response = await fetch(`https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/messages.json`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({userId,name,date,message})
        });

        const resData = await response.json();
        dispatch({type: SEND_MESSAGE, messageData : {  userId, name, date, description }});
   };
};