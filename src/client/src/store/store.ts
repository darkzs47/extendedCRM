import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import userReducer from "./user/reducer.ts";
import {thunk, type ThunkDispatch} from 'redux-thunk';

const rootReducer = combineReducers({
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// @ts-ignore
const store  = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
export type AppDispatch = ThunkDispatch<RootState, unknown, unknown>;
export default store;