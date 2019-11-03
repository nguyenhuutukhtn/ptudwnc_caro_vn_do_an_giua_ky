import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const initialState = {};

const loggerMiddleware = createLogger();

const middleware = [thunkMiddleware];

export const store = createStore(rootReducer, applyMiddleware(...middleware));
