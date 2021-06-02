import Cookie from 'js-cookie';
import { authAPI } from "@api/auth-api";

const AUTHENTICATED_SUCCESS = 'auth-reducer/AUTHENTICATED_SUCCESS';
const AUTHENTICATED_FAIL = 'auth-reducer/AUTHENTICATED_FAIL';

const LOAD_USER_SUCCESS = 'auth-reducer/LOAD_USER_SUCCESS';
const LOAD_USER_FAIL = 'auth-reducer/LOAD_USER_FAIL';

const LOGOUT = 'auth-reducer/LOGOUT';


let initialState = {
  access: Cookie.get('access'),
  refresh: Cookie.get('refresh'),
  isAuth: false,
  user: {},
}


const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      Cookie.set('access', payload.access_token);
      Cookie.set('refresh', payload.refresh_token);
      return {
        ...state,
        isAuth: true,
        access: payload.access_token,
        refresh: payload.refresh_token,
        user: payload.user,
      }

    case LOAD_USER_SUCCESS:
      return {
        ...state,
        isAuth: true,
        user: payload,
        
      }
    
    case LOAD_USER_FAIL:
      return {
        ...state,
        isAuth: false,
        user: null
      }

    case LOGOUT:
    case AUTHENTICATED_FAIL:
      Cookie.remove('access');
      Cookie.remove('refresh');
      return {
        ...state,
        isAuth: false,
        access: null,
        refresh: null,
        user: null
      }

    default:
      return state;
  }
}

export const loadUser = () => async (dispatch) => {
  if (Cookie.get('access')) {
    try {

      // send load_user API request
      let data = await authAPI.user();

      // save data to the state
      dispatch({ type: LOAD_USER_SUCCESS, payload: data })

    } catch (error) {

      // clear data
      dispatch({ type: LOAD_USER_FAIL });
    }

  } else {

    // clear data
    dispatch({ type: LOAD_USER_FAIL });
  }
}



export const login = (email, password, actions) => async (dispatch) => {
  try {

    // send login API request
    let data = await authAPI.login(email, password);

    // stop loading the submit button
    actions.setSubmitting(false);

    // save data to the state
    dispatch({ type: AUTHENTICATED_SUCCESS, payload: data });

  } catch (error) {

    // stop loading the submit button
    actions.setSubmitting(false);

    // show global server error
    actions.setFieldError('global_error', 'Введен неправильный email или пароль, попробуйте еще раз');

    // clear data
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
    dispatch({ type: AUTHENTICATED_SUCCESS, payload: data });

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

    // clear data
    dispatch({ type: AUTHENTICATED_FAIL });
  }
}



export const logout = () => async (dispatch) => {
  try {

    // send logout API request
    await authAPI.logout();

    // clear data
    dispatch({ type: LOGOUT });

  } catch (error) {
    console.log(error);
  }
}

export default authReducer;