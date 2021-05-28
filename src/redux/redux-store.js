import thunkMiddlewere from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './auth-reducer';

let rootReducer = combineReducers({
  auth: authReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddlewere));

export default store;