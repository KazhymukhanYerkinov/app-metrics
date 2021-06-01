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
    
    // send login API request
    let data = await authAPI.login(email, password);

    // save the token to a cookie
    Cookie.set('access', data.access_token);

    // stop loading the submit button
    actions.setSubmitting(false);

    // save data to the state
    dispatch({ type: LOGIN_SUCCESS, access: data.access_token});

  } catch (error) {

    // stop loading the submit button
    actions.setSubmitting(false);

    // show global server error
    actions.setFieldError('global_error', 'Введен неправильный email или пароль, попробуйте еще раз');

    // delete data to the state
    dispatch({ type: LOGIN_FAIL });
  }
}

export const registration = (username, email, password1, password2, actions) => async (dispatch) => {
  try {

    // send registration APi request
    await authAPI.register(username, email, password1, password2);

    // stop loading the submit button
    actions.setSubmitting(false);
    
  } catch (error) {

    // stop loading the submit button 
    actions.setSubmitting(false);
  }
}

export default authReducer;