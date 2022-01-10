import { URL, setCookie, deleteCookie, getCookie } from '../../utils/utils';
  import { TProfile, TResetPassword, AppDispatch, AppThunk } from '../../utils/types';
  import { TResponseBody, registerRequest, loginRequest, forgotPasswordRequest, resetPasswordRequest, logoutRequest } from '../api';
  
  export const REGISTRATION: 'REGISTRATION' = 'REGISTRATION';
  export const AUTHORIZATION: 'AUTHORIZATION' = 'AUTHORIZATION';
  export const EXIT: 'EXIT' = 'EXIT';
  export const GET_USER: 'GET_USER' = 'GET_USER';
  export const UPDATE_USER: 'UPDATE_USER' = 'UPDATE_USER';
  export const POST_EMAIL: 'POST_EMAIL' = 'POST_EMAIL';
  export const RESET_PASSWORD: 'RESET_PASSWORD' = 'RESET_PASSWORD';
  export const GET_FAILED: 'GET_FAILED' = 'GET_FAILED';

type TRegisterActionSuccess = {
  readonly type: typeof REGISTRATION;
  readonly email: string;
  readonly name: string;
  readonly accessToken: string;
  readonly refreshToken: string;
};
type TLoginActionsSuccess = {
  readonly type: typeof AUTHORIZATION;
  readonly email: string;
  readonly name: string;
  readonly accessToken: string;
  readonly refreshToken: string;
};
type TForgotPasswordActionsSuccess = { readonly type: typeof POST_EMAIL; }
type TResetPasswordActionsSuccess = { readonly type: typeof RESET_PASSWORD; }
type TExitActionSuccess = { readonly type: typeof EXIT };
type TGetUserActionsSuccess = { readonly type: typeof GET_USER; readonly email: string; readonly name: string; }
type TUpdateUserActionsSuccess = { readonly type: typeof UPDATE_USER; readonly email: string; readonly name: string; }
type TGetActionFailed = { readonly type: typeof GET_FAILED };

const loginSuccess = (email: string, name: string, accessToken: string, refreshToken: string): TLoginActionsSuccess => {
  return {
    type: AUTHORIZATION,
    email: email,
    name: name,
    accessToken: accessToken,
    refreshToken: refreshToken
  }
}

const registrationSuccess = ( email: string, name: string, accessToken: string, refreshToken: string): TRegisterActionSuccess => {
  return {
    type: REGISTRATION,
    email: email,
    name: name,
    accessToken: accessToken,
    refreshToken: refreshToken
  };
};

const forgotPasswordSuccess = (): TForgotPasswordActionsSuccess => {
  return {
    type: POST_EMAIL,
  }
}

const resetPasswordSuccess = (): TResetPasswordActionsSuccess => {
  return {
    type: RESET_PASSWORD,
  }
}

const exitSuccess = (): TExitActionSuccess => {
  return {
    type: EXIT,
  }
}

const getUserSuccess = (email: string, name: string): TGetUserActionsSuccess => {
  return {
    type: GET_USER,
    email: email,
    name: name
  }
}

const updateUserSuccess = (email: string, name: string): TUpdateUserActionsSuccess => {
  return {
    type: UPDATE_USER,
    email: email,
    name: name
  }
}

const getFailed = (): TGetActionFailed => {
  return {
    type: GET_FAILED
  };
};

export type TLoginActions = ReturnType<
  typeof registrationSuccess
  | typeof loginSuccess
  | typeof forgotPasswordSuccess
  | typeof resetPasswordSuccess
  | typeof exitSuccess
  | typeof getUserSuccess
  | typeof updateUserSuccess
  | typeof getFailed
>;
  
  export const register: AppThunk = ( data: TProfile) => {
      return function(dispatch: AppDispatch) {
          registerRequest(data)
          .then(res => {
            if (res.success) {
              localStorage.setItem('token', res.refreshToken ? res.refreshToken : '');
              localStorage.setItem('authorization', 'true');
              setCookie('accessToken', res.accessToken ? res.accessToken : '');
              dispatch(registrationSuccess(res.user.email, res.user.name, res.accessToken ? res.accessToken : '', res.refreshToken ? res.refreshToken : ''));
            } else {
              dispatch(getFailed());
            }
          })
          .catch(() => dispatch(getFailed()) );
      };
    }
  
    export const login: AppThunk = ( data: TProfile ) => {
      return function(dispatch: AppDispatch) {
          loginRequest(data)
          .then(res => {
            if (res.success) {
              localStorage.setItem('token', res.refreshToken ? res.refreshToken : '');
              localStorage.setItem('authorization', 'true');
              setCookie('accessToken', res.accessToken ? res.accessToken : '');
              dispatch(loginSuccess(res.user.email, res.user.name, res.accessToken ? res.accessToken : '', res.refreshToken ? res.refreshToken : ''));
            } else {
              dispatch(getFailed());
            }
          })
          .catch(() => dispatch(getFailed()) );;
      };
    }
  
    export const forgotPassword: AppThunk = ( data: TProfile ) => {
      return function(dispatch: AppDispatch) {
        forgotPasswordRequest(data)
        .then(res => {
          if (res.success) {
              dispatch(forgotPasswordSuccess())
          }
        })
        .catch(() => dispatch(getFailed()))
      };
    }
  
    export const resetPassword: AppThunk = ( data: TResetPassword ) => {
      return function(dispatch: AppDispatch) {
          resetPasswordRequest(data)
        .then(res => {
          if (res.success) {
              dispatch(resetPasswordSuccess())
          }
        })
        .catch(() => dispatch(getFailed()))
      };
    }
  
    export const exit: AppThunk = () => {
      return function(dispatch: AppDispatch) {
          logoutRequest()
          .then(res => {
            if (res.success) {
              localStorage.removeItem('token');
              localStorage.setItem('authorization', 'false');
              localStorage.removeItem('authorization')
              deleteCookie('accessToken');
              dispatch(exitSuccess());
            } else {
              dispatch(getFailed())
            }
          })
          .catch(() => dispatch(getFailed()) );;
      };
    }
  
    export const updateToken: any = () => {
          return fetch(`${URL}/auth/token`, {
              method: "POST",
              headers: {
                  "content-type": "application/json"
              },
              body: JSON.stringify({
                  "token": localStorage.getItem('token')
              }),
          }).then(res => res.ok ? res.json() : res.json().then((err) => Promise.reject(err)))
    }
  
    export const getUser: AppThunk = () => {
      return function(dispatch: AppDispatch) {
        retriableFetch(`${URL}/auth/user`, {
             method: "GET",
              headers: {
                  "content-type": "application/json",
                  'authorization': getCookie('accessToken') 
              }
          }
        ).then(res => {
            if (res.success) {
             dispatch(getUserSuccess(res.user.email, res.user.name));
            } else {
              localStorage.setItem('authorization', 'false');
              dispatch(getFailed())
            }
          }).catch(() => dispatch(getFailed()) );
      };
    }
  
    export const updateUser: AppThunk = (data: TProfile) => {
      return function(dispatch: AppDispatch) {
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
                dispatch(updateUserSuccess(res.user.email, res.user.name));
              } else {
                dispatch(getFailed())
              }
            }).catch(() => dispatch(getFailed()) );
      };
    }
  
    const retriableFetch = async(url: string, options?: RequestInit | undefined | any): Promise<
    TResponseBody<'user', TProfile>> => {
      try {
        const res = await fetch(url, options).then(res => res.json());
        //const result = await checkReponse(res);
        return res;
      } catch (err) {
        if ( (err as Error).message! === "jwt expired") {
          console.log('progress...')
          const refreshData = await updateToken();
          localStorage.setItem("token", refreshData.refreshToken); 
          localStorage.setItem('authorization', 'true');
          setCookie("accessToken", refreshData.accessToken);
          options.headers.authorization = getCookie('accessToken');
          const res = await fetch(url, options).then(res => res.json());
          return res;
        } else {
          throw err;
        }
      }
    }