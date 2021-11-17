import { URL } from '../../utils/utils'

export function register({email, password, name}) {
    return function(dispatch) {
        fetch(`${URL}/auth/register`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "email": email, 
                "password": password, 
                "name": name
            }),
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then(res => {
            console.log(res)
          if (res.success) {
            dispatch({
              type: 'REGISTRATION',
              email: res.user.email,
              name: res.user.name,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken
            });
          } else {
            dispatch({
              type: 'GET_FAILED'
            });
          }
        })
        .catch(() => dispatch({ type: 'GET_FAILED'}) );;
    };
  }