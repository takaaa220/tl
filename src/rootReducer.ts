import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./modules/task";
import sessionReducer from "./modules/session";

const rootReducer = combineReducers({
  session: sessionReducer,
  tasks: taskReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
