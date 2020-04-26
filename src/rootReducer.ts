import { combineReducers } from "@reduxjs/toolkit";
import taskReducer from "./modules/task";
import sessionReducer from "./modules/session";
import filterReducer from "./modules/filter";

const rootReducer = combineReducers({
  session: sessionReducer,
  tasks: taskReducer,
  filter: filterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
