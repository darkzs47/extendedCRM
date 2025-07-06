import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import currentUserReducer from "./currentUser/reducer.ts";
import {thunk, type ThunkDispatch} from 'redux-thunk';
import {usersReducer} from "./users/reducer.ts";
import {customersReducer} from "./customers/reducer.ts";
import { customerReducer } from './customer/reducer.ts';

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    users: usersReducer,
    customers: customersReducer,
    customer: customerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// @ts-ignore
const store  = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
export type AppDispatch = ThunkDispatch<RootState, unknown, unknown>;
export default store;