import Cookie from 'js-cookie';
import { authAPI } from "@api/auth-api";

const LOGIN_SUCCESS = 'auth-reducer/LOGIN_SUCCESS';
const LOGIN_FAIL = 'auth-reducer/LOGIN_FAIL';

let inititalState = {
  access: Cookie.get('access'),
  isAuth: false,
  user: {},
}




const authReducer = (state = inititalState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        access: action.access
      }

    case LOGIN_FAIL:
      Cookie.remove('access');
      return {
        ...state,
        isAuth: false,
        access: null
      }

    default:
      return state;
  }
}


export const login = (email, password, actions) => async (dispatch) => {
  try {

    let data = await authAPI.login(email, password);
    Cookie.set('access', data.access_token);
    actions.setSubmitting(false);
    dispatch({ type: LOGIN_SUCCESS, access: data.access_token});

  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
  }
}

export default authReducer;