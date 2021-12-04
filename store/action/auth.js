export const SIGNUP = 'SIGNUP';
export const LOGIN ='LOGIN';

export const signup = (email, password) => {
    return async dispatch => {
          const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuBVtdjghZU7caV63G6goIuKh46NxHEEk',
            {
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            }
          );

          if (!response.ok) {
            const errorResData = await response.json();
            const errorId= errorResData.error.message;
            let message = 'Somthing went worng';
            if(errorId === 'EMAIL_EXISTS') {
                message = 'This email exists already!';
            } 
            throw new Error(message)
        }  
          const resData = await response.json();
         fetch(`https://gymapp-b60ab-default-rtdb.europe-west1.firebasedatabase.app/users/${resData.localId}.json`,
          {
              method:'PUT',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userId: resData.localId,
                permission: '',
                name: '',
              })
          }
        );
        dispatch({ type: SIGNUP, token: resData.idToken , userId: resData.localId});
       };
    };

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuBVtdjghZU7caV63G6goIuKh46NxHEEk',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
            })
        }
        );
    
        if (!response.ok) {
            const errorResData = await response.json();
            const errorId= errorResData.error.message;
            let message = 'Somthing went worng';
            if(errorId === 'EMAIL_NOT_FOUND') {
                message = 'This email could not be found!';
            } else if (errorId === 'INVALID_PASSWORD'){
                message = 'This Password is not valid!';
            }
            throw new Error(message)
        }    
        const resData = await response.json();
        dispatch({ type: LOGIN, token: resData.idToken , userId: resData.localId});
    };
    };
    
