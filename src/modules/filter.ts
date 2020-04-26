import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Filter } from "../constants/task";

type State = {
  filter: Filter;
};

const initialState: State = {
  filter: "None",
};

const reducers = {
  changeFilter(state: State, action: PayloadAction<Filter>) {
    return {
      ...state,
      filter: action.payload,
    };
  },
  clearFilter() {
    return initialState;
  },
};

const slice = createSlice({
  name: "taskFilter",
  initialState,
  reducers,
});

export const { changeFilter, clearFilter } = slice.actions;

export default slice.reducer;
