export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
 
export const signup = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBFo35vACAdKUlxZ_AorZz374BqOc6OvsQ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        }),
      }
    );

    const resData = await response.json();

    if (!response.ok) {
      const errorId = resData.error.message;
      let message = errorId;

      if (errorId === 'EMAIL_EXISTS') {
        message = 'This email already exists!';
      } 

      throw new Error(message);
    }

    dispatch({
      type: SIGNUP,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};

export const login = (email, password) => {
  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBFo35vACAdKUlxZ_AorZz374BqOc6OvsQ',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        }),
      }
    );

    const resData = await response.json();
    
    if (!response.ok) {
      const errorId = resData.error.message;
      let message = errorId;

      if (errorId === 'EMAIL_NOT_FOUND') {
        message = 'This email could not be found!';
      } else if (errorId === 'INVALID_PASSWORD') {
        message = 'This password is not valid!';
      }

      throw new Error(message);
    }

    dispatch({
      type: LOGIN,
      token: resData.idToken,
      userId: resData.localId,
    });
  };
};