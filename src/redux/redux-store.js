import thunkMiddlewere from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';

let rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddlewere));

export default store;
