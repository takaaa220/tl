import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../constants/user";

type State = Partial<User>;

const initialState: State = {
  id: undefined,
  name: undefined,
};

const reducers = {
  updateName: (state: State, action: PayloadAction<string>) => {
    return {
      ...state,
      name: action.payload,
    };
  },
  deleteSession: () => {
    return initialState;
  },
  setSession: (_state: State, action: PayloadAction<State>) => {
    return action.payload;
  },
};

const slice = createSlice({
  name: "session",
  initialState,
  reducers,
});

export const { updateName, deleteSession, setSession } = slice.actions;

export default slice.reducer;
