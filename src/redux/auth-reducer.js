import Cookie from 'js-cookie';
import { authAPI } from "@api/auth-api";

const AUTHENTICATED_SUCCESS = 'auth-reducer/AUTHENTICATED_SUCCESS';
const AUTHENTICATED_FAIL = 'auth-reducer/AUTHENTICATED_FAIL';

const LOAD_USER_SUCCESS = 'auth-reducer/LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'auth-reducer/LOAD_USER_FAIL';


let initialState = {
  access: Cookie.get('access'),
  isAuth: false,
  user: {},
}


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuth: true,
        access: action.access
      }

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: action.user
      }
    
    case LOAD_USER_FAIL:
      return {
        ...state,
        user: null
      }

    case AUTHENTICATED_FAIL:
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

export const loadUser = () => async (dispatch) => {
  if (Cookie.get('access')) {

    try {
      let data = await authAPI.user();
      dispatch({ type: LOAD_USER_SUCCESS, user: data.user })
    } catch (error) {
      dispatch({ type: LOAD_USER_FAIL });
    }

  } else {
    dispatch({ type: LOAD_USER_FAIL });
  }
}

export const login = (email, password, actions) => async (dispatch) => {
  try {

    // send login API request
    let data = await authAPI.login(email, password);

    // save the token to a cookie
    Cookie.set('access', data.access_token);

    // stop loading the submit button
    actions.setSubmitting(false);

    // save data to the state
    dispatch({ type: AUTHENTICATED_SUCCESS, access: data.access_token });

  } catch (error) {

    // stop loading the submit button
    actions.setSubmitting(false);

    // show global server error
    actions.setFieldError('global_error', 'Введен неправильный email или пароль, попробуйте еще раз');

    // delete data to the state
    dispatch({ type: AUTHENTICATED_FAIL });
  }
}

export const registration = (username, email, password1, password2, actions) => async (dispatch) => {
  try {

    // send registration APi request
    let data = await authAPI.register(username, email, password1, password2);

    // stop loading the submit button
    actions.setSubmitting(false);

    // save data to the state
    dispatch({ type: AUTHENTICATED_SUCCESS, access: data.access_token });

  } catch (error) {
    const err = error.response.data;

    // if there is an email error, show it
    if (!!err.email) actions.setFieldError('email', err.email[0]);

    // username error, show it
    else if (!!err.username) actions.setFieldError('username', err.username[0]);

    // password error, show it
    else if (!!err.password1) actions.setFieldError('password1', err.password1[0]);

    // stop loading the submit button 
    actions.setSubmitting(false);

    // delete data to the state
    dispatch({ type: AUTHENTICATED_FAIL });
  }
}

export default authReducer;