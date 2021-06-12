import thunkMiddlewere from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import oldKlikReducer from './old-klik-reducer'

let rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  oldKlik: oldKlikReducer
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddlewere));

export default store;
