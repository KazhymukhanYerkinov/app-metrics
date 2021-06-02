import { loadUser } from "./auth-reducer";

const APP_INITIALIZED_SUCCESS = 'app-reducer/APP_INITIALIZED_SUCCESS';


let initialState = {
  initialized: false
}

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      }

    default:
      return state;
  }
}

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(loadUser());

  Promise.all([promise]).then(() => {
    dispatch({ type: APP_INITIALIZED_SUCCESS })
  })
}

export default appReducer;