import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "../constants/task";

type State = {
  tasks: Task[];
};

const initialState: State = {
  tasks: [
    {
      id: 2,
      title: "いいかんじのTodo",
      done: false,
      userId: 1,
    },
    {
      id: 1,
      title: "いい感じではないTodo",
      done: true,
      userId: 1,
    },
  ],
};

// TODO: 別の方法に変える (ちょっとめんどくさかった)
let currentId = 2;

const reducers = {
  addTask(state: State, action: PayloadAction<string>) {
    const newTask = {
      id: ++currentId,
      title: action.payload,
      done: false,
      userId: 1,
    };
    const tasks = [newTask, ...state.tasks];

    return {
      ...state,
      tasks,
    };
  },
  changeStateTask(state: State, action: PayloadAction<Pick<Task, "id" | "done">>) {
    const tasks = state.tasks.map((task) =>
      task.id === action.payload.id
        ? {
            ...task,
            done: action.payload.done,
          }
        : task,
    );

    return {
      ...state,
      tasks,
    };
  },
  deleteTask(state: State, action: PayloadAction<number>) {
    const tasks = state.tasks.filter((task) => task.id !== action.payload);

    return {
      ...state,
      tasks,
    };
  },
};

const slice = createSlice({
  name: "task",
  initialState,
  reducers,
});

export const { addTask, changeStateTask, deleteTask } = slice.actions;

export default slice.reducer;
