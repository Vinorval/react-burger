const initialState = {
    email: '',
    name: '',
    accessToken: '',
    refreshToken: '',
    notAuth: true
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTRATION': {
            console.log(action);
          return { ...state, email: action.email, name: action.name, accessToken: action.accessToken, refreshToken: action.refreshToken, notAuth: false };
        }
        case 'AUTHORIZATION': {
          return { ...state, email: action.email, name: action.name, accessToken: action.accessToken, refreshToken: action.refreshToken, notAuth: false};
        }
        case 'EXIT': {
            return { ...state, email: '', name: '', accessToken: '', refreshToken: '', notAuth: true }
        }
        case 'UPDATE_TOKEN': {
            return { ...state, accessToken: action.accessToken }
        }
        case 'GET_USER': {
            return { ...state, email: action.email, name: action.name, notAuth: false }
        }
        case 'UPDATE_USER': {
            return { ...state, email: action.email, name: action.name }
        }
        default: {
          return state;
        }
      }
}