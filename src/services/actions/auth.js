import { URL, setCookie, deleteCookie, getCookie, getNewToken } from '../../utils/utils';
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
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then(res => {
          if (res.success) {
            localStorage.setItem('token', res.refreshToken);
            localStorage.setItem('authorization', true);
            setCookie('accessToken', res.accessToken);
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
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then(res => {
          if (res.success) {
            localStorage.setItem('token', res.refreshToken);
            localStorage.setItem('authorization', true);
            setCookie('accessToken', res.accessToken);
            dispatch({
              type: 'AUTHORIZATION',
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

  export function exit() {
    return function(dispatch) {
        fetch(`${URL}/auth/logout`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                "token": getCookie('token')
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
            localStorage.removeItem('token');
            localStorage.removeItem('authorization');
            deleteCookie('accessToken');
            dispatch({
              type: 'EXIT',
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
              type: 'GET_USER',
              email: res.user.email,
              name: res.user.name
            });
          } else {
            localStorage.setItem('authorization', false);
            dispatch({
              type: 'GET_FAILED'
           });
          }
        })//.catch(() => getNewToken(updateToken, getUser) );
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
                type: 'UPDATE_USER',
                email: res.user.email,
                name: res.user.name
              });
            } else {
              dispatch({
                type: 'GET_FAILED'
              });
            }
          }).catch(() => getNewToken(updateToken, getUser) );
    };
  }

  const retriableFetch = async(url, options = {}) => {
    try {
      console.log(localStorage.getItem('token'))
      const res = await fetch(url, options);
      const result = await checkReponse(res);
      return result;
    } catch (err) {
      if (err.message === "jwt expired") {
        console.log('progress...')
        const refreshData = await updateToken();
        console.log(refreshData)
        localStorage.setItem("token", refreshData.refreshToken); 
        localStorage.setItem('authorization', true);
        //console.log(getCookie('accessToken'))
        setCookie("accessToken", refreshData.accessToken);
        //console.log(getCookie('accessToken'))
        console.log(refreshData.accessToken)
        //options.headers = {}
        console.log(options.headers)
        options.headers.authorization = getCookie('accessToken');
        console.log(options.headers)
        console.log(options.headers.authorization)
        const res = await fetch(url, options);
        return await checkReponse(res);
      } else {
        throw err;
      }
    }
  }