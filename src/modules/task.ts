import { createSlice, PayloadAction, ThunkDispatch, ThunkAction } from "@reduxjs/toolkit";
import { Task } from "../constants/task";
import { AppThunkAction } from "../store";
import { createTask, updateStatusTask, destroyTask } from "../api";

type State = {
  loading: boolean;
  tasks: Task[];
};

const initialState: State = {
  loading: false,
  tasks: [],
};

const reducers = {
  startAdd(state: State, action: PayloadAction<string>) {
    const newTask = {
      id: -1,
      title: action.payload,
      done: false,
      loading: true,
      userId: 1,
    };

    return {
      ...state,
      tasks: [newTask, ...state.tasks],
      loading: true,
    };
  },
  addTask(state: State, action: PayloadAction<Task>) {
    const tasks = state.tasks.map((task) => (task.id === -1 ? action.payload : task));

    return {
      ...state,
      tasks,
      loading: false,
    };
  },
  changeStatus(state: State, action: PayloadAction<Task>) {
    const tasks = state.tasks.map((task) =>
      task.id === action.payload.id ? action.payload : task,
    );

    return {
      ...state,
      tasks,
    };
  },
  startFetch(state: State, action: PayloadAction<void>) {
    return {
      ...state,
      loading: true,
    };
  },
  deleteTask(state: State, action: PayloadAction<number>) {
    const tasks = state.tasks.filter((task) => task.id !== action.payload);

    return {
      ...state,
      tasks,
      loading: false,
    };
  },
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers,
});

export const { addTask, startAdd, changeStatus, startFetch, deleteTask } = slice.actions;

export const addTaskThunk = (title: string): AppThunkAction => async (dispatch, getState) => {
  dispatch(startAdd(title));
  const newTask = await createTask(title, 1);
  dispatch(addTask(newTask));
};

export const changeStatusThunk = (id: number, done: boolean): AppThunkAction => async (
  dispatch,
) => {
  dispatch(startFetch());
  const task = await updateStatusTask(id, done);
  dispatch(changeStatus(task));
};

export const deleteTaskThunk = (id: number): AppThunkAction => async (dispatch) => {
  dispatch(startFetch());
  await destroyTask(id);
  dispatch(deleteTask(id));
};

export default slice.reducer;
