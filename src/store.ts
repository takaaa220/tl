import { configureStore, applyMiddleware, Action, createStore } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import thunk from "redux-thunk";
import rootReducer, { RootState } from "./rootReducer";

const store = createStore(rootReducer, undefined, applyMiddleware(thunk));

export type AppDispatch = typeof store.dispatch;
export type AppThunkAction = ThunkAction<void, RootState, null, Action<string>>;

export default store;
