import {legacy_createStore as createStore, combineReducers, applyMiddleware} from 'redux';
import currentUserReducer from "./currentUser/reducer.ts";
import {thunk, type ThunkDispatch} from 'redux-thunk';
import {usersReducer} from "./users/reducer.ts";
import {customersReducer} from "./customers/reducer.ts";
import { customerReducer } from './customer/reducer.ts';
import {suppliersReducer} from "./suppliers/reducer.ts";
import {supplierReducer} from "./supplier/reducer.ts";
import {categoriesReducer} from "./categories/reducer.ts";
import {toolsReducer} from "./tools/reducer.ts";
import {coefficientsReducer} from "./coefficients/reducer.ts";
import {ordersReducer} from "./orders/reducer.ts";

const rootReducer = combineReducers({
    currentUser: currentUserReducer,
    users: usersReducer,
    customers: customersReducer,
    customer: customerReducer,
    suppliers: suppliersReducer,
    supplier: supplierReducer,
    categories: categoriesReducer,
    tools: toolsReducer,
    coefficients: coefficientsReducer,
    orders: ordersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// @ts-ignore
const store  = createStore(rootReducer, applyMiddleware(thunk));
// @ts-ignore
export type AppDispatch = ThunkDispatch<RootState, unknown, unknown>;
export default store;