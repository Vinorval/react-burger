import {
  REGISTRATION,
  AUTHORIZATION,
  EXIT,
  GET_USER,
  UPDATE_USER,
  POST_EMAIL,
  RESET_PASSWORD,
  TLoginActions
} from "../actions/auth";

type TInitialState = {
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  toForgotPassword: boolean;
}

const initialState: TInitialState = {
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
    toForgotPassword: false,
};

export const auth = (state = initialState, action: TLoginActions) => {
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