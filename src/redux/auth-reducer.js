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
    actions.setSubmitting(false);
    actions.setFieldError('global_error', 'Введен неправильный email или пароль, попробуйте еще раз');
    dispatch({ type: LOGIN_FAIL });
  }
}

export const registration = (username, email, password1, password2) => async (dispatch) => {
  try {
    let data = await authAPI.register(username, email, password1, password2);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export default authReducer;