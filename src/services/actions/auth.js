import { URL, setCookie, deleteCookie, getCookie } from '../../utils/utils';

export const REGISTRATION = 'REGISTRATION';
export const AUTHORIZATION = 'AUTHORIZATION';
export const EXIT = 'EXIT';
export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const GET_FAILED = 'GET_FAILED';

//проверка запроса
const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

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
        .then(res => checkReponse(res))
        .then(res => {
          if (res.success) {
            localStorage.setItem('token', res.refreshToken);
            localStorage.setItem('authorization', true);
            setCookie('accessToken', res.accessToken);
            dispatch({
              type: REGISTRATION,
              email: res.user.email,
              name: res.user.name,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken
            });
          } else {
            dispatch({
              type: GET_FAILED
            });
          }
        })
        .catch(() => dispatch({ type: GET_FAILED}) );
    };
  }

  export function login({email, password}) {
    return function(dispatch) {
        fetch(`${URL}/auth/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "email": email, 
                "password": password
            }),
        })
        .then(res => checkReponse(res))
        .then(res => {
          if (res.success) {
            localStorage.setItem('token', res.refreshToken);
            localStorage.setItem('authorization', true);
            setCookie('accessToken', res.accessToken);
            dispatch({
              type: AUTHORIZATION,
              email: res.user.email,
              name: res.user.name,
              accessToken: res.accessToken,
              refreshToken: res.refreshToken
            });
          } else {
            dispatch({
              type: GET_FAILED
            });
          }
        })
        .catch(() => dispatch({ type: GET_FAILED}) );;
    };
  }

  export function exit() {
    return function(dispatch) {
        fetch(`${URL}/auth/logout`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "token": localStorage.getItem('token')
            }),
        })
        .then(res => checkReponse(res))
        .then(res => {
            console.log(res)
          if (res.success) {
            localStorage.removeItem('token');
            localStorage.setItem('authorization', false);
            localStorage.removeItem('authorization')
            deleteCookie('accessToken');
            dispatch({
              type: EXIT,
            });
          } else {
            dispatch({
              type: GET_FAILED
            });
          }
        })
        .catch(() => dispatch({ type: GET_FAILED}) );;
    };
  }

  export function updateToken() {
        return fetch(`${URL}/auth/token`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "token": localStorage.getItem('token')
            }),
        }).then(res => checkReponse(res))
  }

  export function getUser() {
    return function(dispatch) {
      retriableFetch(`${URL}/auth/user`, {
           method: "GET",
            headers: {
                "content-type": "application/json",
                'authorization': getCookie('accessToken') 
            }
        }
      ).then(res => {
          if (res.success) {
           dispatch({
              type: GET_USER,
              email: res.user.email,
              name: res.user.name
            });
          } else {
            localStorage.setItem('authorization', false);
            dispatch({
              type: GET_FAILED
           });
          }
        }).catch(() => dispatch({ type: GET_FAILED}) );
    };
  }

  export function updateUser(data) {
    return function(dispatch) {
      retriableFetch(`${URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'authorization': getCookie('accessToken') 
            },
            body: JSON.stringify({
                "email": data.email,
                'name': data.name,
                'password': data.password
            }),
        }).then(res => {
            if (res.success) {
              dispatch({
                type: UPDATE_USER,
                email: res.user.email,
                name: res.user.name
              });
            } else {
              dispatch({
                type: GET_FAILED
              });
            }
          }).catch(() => dispatch({ type: GET_FAILED}) );
    };
  }

  const retriableFetch = async(url, options = {}) => {
    try {
      const res = await fetch(url, options);
      const result = await checkReponse(res);
      return result;
    } catch (err) {
      if (err.message === "jwt expired") {
        console.log('progress...')
        const refreshData = await updateToken();
        localStorage.setItem("token", refreshData.refreshToken); 
        localStorage.setItem('authorization', true);
        setCookie("accessToken", refreshData.accessToken);
        options.headers.authorization = getCookie('accessToken');
        const res = await fetch(url, options);
        return await checkReponse(res);
      } else {
        throw err;
      }
    }
  }