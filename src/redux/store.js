import { combineReducers, createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";

import quiz from "./modules/quiz";

const rootReducer = combineReducers({
    "quiz": quiz,
});

const store = createStore(
    rootReducer,
    applyMiddleware(thunk),
);

export default store;