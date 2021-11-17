const initialState = {
    email: '',
    name: '',
    accessToken: '',
    refreshToken: ''
};

export const auth = (state = initialState, action) => {
    switch (action.type) {
        case 'REGISTRATION': {
            console.log(action);
          return { ...state, email: action.email, name: action.name, accessToken: action.accessToken, refreshToken: action.refreshToken };
        }
        case 'AUTHORIZATION': {
          return { ...state, email: action.email, name: action.name, accessToken: action.accessToken, refreshToken: action.refreshToken};
        }
        case 'EXIT': {
            return { ...state, email: '', name: '', accessToken: '', refreshToken: '' }
        }
        case 'UPDATE_TOKEN': {
            return { ...state, accessToken: action.accessToken }
        }
        case 'GET_USER': {
            return { ...state, email: action.email, name: action.name }
        }
        case 'UPDATE_USER': {
            return { ...state, email: action.email, name: action.name }
        }
        default: {
          return state;
        }
      }
}