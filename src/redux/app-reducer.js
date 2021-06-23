import { loadUser } from "./auth-reducer";

const APP_INITIALIZED_SUCCESS =
  "app-reducer/APP_INITIALIZED_SUCCESS";
const CHANGE_VIEW_MODE = "change_view_mode";

let initialState = {
  initialized: false,
  viewMode: window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches
    ? "dark"
    : "light",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case APP_INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    case CHANGE_VIEW_MODE:
      return {
        ...state,
        viewMode: action.data,
      };
    default:
      return state;
  }
};

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(loadUser());

  Promise.all([promise]).then(() => {
    dispatch({ type: APP_INITIALIZED_SUCCESS });
  });
};

export default appReducer;
