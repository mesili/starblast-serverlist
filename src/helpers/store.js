import { compose, createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { combineReducers } from "redux";

import  { servers }  from "state/servers";

const rootReducer = combineReducers({
    servers,
});

export default rootReducer;

const isDev = process.env.NODE_ENV === "development"; 

const composeEnhancers = (isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace:true, traceLimit:25 }) 
    : compose;

const middlewares = [
    thunkMiddleware,
];

if (isDev) {
    const { logger } = require("redux-logger");
    middlewares.push(logger);
}

export const store = initialState => createStore(
    rootReducer,
    initialState, 
    composeEnhancers( applyMiddleware( ...middlewares ) ) 
);
