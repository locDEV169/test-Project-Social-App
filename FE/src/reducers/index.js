import { combineReducers } from "redux";
import cardReducer from './card';
import reactReducer from './react';
import commentReducer from './comment';

const rootReducer = combineReducers({
    cardReducer,
    reactReducer,
    commentReducer
});


export default rootReducer;
