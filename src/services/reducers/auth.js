import { REGISTRATION, AUTHORIZATION, EXIT, GET_USER, UPDATE_USER, POST_EMAIL, RESET_PASSWORD } from "../actions/auth";

const initialState = {
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
    toForgotPassword: false,
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case REGISTRATION: {
          return { ...state, email: action.email, name: action.name, accessToken: action.accessToken, refreshToken: action.refreshToken };
        }
        case AUTHORIZATION: {
          return { ...state, email: action.email, name: action.name, accessToken: action.accessToken, refreshToken: action.refreshToken};
        }
        case EXIT: {
            return { ...state, email: '', name: '', accessToken: '', refreshToken: '' }
        }
        case GET_USER: {
            return { ...state, email: action.email, name: action.name }
        }
        case UPDATE_USER: {
            return { ...state, email: action.email, name: action.name }
        }
        case POST_EMAIL: {
          return { ...state, toForgotPassword: true }
        }
        case RESET_PASSWORD: {
          return { ...state, toForgotPassword: false }
        }
        default: {
          return state;
        }
      }
}