import { URL, setCookie, deleteCookie, getCookie, getNewToken } from '../../utils/utils'

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
            setCookie('token', res.refreshToken);
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
            setCookie('token', res.refreshToken);
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
            deleteCookie('token');
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
    return function(dispatch) {
        fetch(`${URL}/auth/token`, {
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
          if (res.success) {
            setCookie('token', res.refreshToken);
            setCookie('accessToken', res.accessToken);
            dispatch({
              type: 'UPDATE_TOKEN',
              accessToken: res.accessToken
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

  export function getUser() {
    return function(dispatch) {
        fetch(`${URL}/auth/user`, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                'Authorization': getCookie('accessToken') 
            }
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else if (!res.ok) { return getNewToken(updateToken, getUser)}
          //updateToken()
          //return getUser();
        })
        .then(res => {
          if (res.success) {
            dispatch({
              type: 'GET_USER',
              email: res.user.email,
              name: res.user.name
            });
          } else {
            dispatch({
              type: 'GET_FAILED'
            });
          }
        })
        .catch(() => getNewToken(updateToken, getUser) );;
    };
  }

  export function updateUser(data) {
    return function(dispatch) {
        fetch(`${URL}/auth/user`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                'Authorization': getCookie('accessToken') 
            },
            body: JSON.stringify({
                "email": data.email,
                'name': data.name,
                'password': data.password
            }),
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else if (!res.ok) { return getNewToken(updateToken, getUser)}
          //updateToken()
          //return getUser();
        })
        .then(res => {
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
        })
        .catch(() => getNewToken(updateToken, getUser) );;
    };
  }