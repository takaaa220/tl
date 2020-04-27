import { Task } from "./constants/task";

let currentId = 2;
let tasks: Task[] = [
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
];

const sleep = (msec = 300) => new Promise((resolve) => setTimeout(resolve, msec));

export const getTask = (id: number) =>
  new Promise<Task>(async (resolve, reject) => {
    await sleep();

    const task = tasks.find((task) => task.id === id);
    if (task) {
      resolve(task);
    } else {
      reject({
        error: "not found",
      });
    }
  });

export const getTasks = () =>
  new Promise<Task[]>(async (resolve, reject) => {
    await sleep();

    resolve(tasks);
  });

export const createTask = (title: string, userId: number) =>
  new Promise<Task>(async (resolve) => {
    await sleep();

    const newTask = {
      id: ++currentId,
      title,
      done: false,
      userId,
    };
    tasks = [newTask, ...tasks];
    resolve(newTask);
  });

export const updateStatusTask = (id: number, done: boolean) =>
  new Promise<Task>(async (resolve, reject) => {
    await sleep();

    const task = tasks.find((task) => task.id === id);
    tasks = tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            done,
          }
        : task,
    );

    if (!task) {
      return reject({
        error: "not found",
      });
    }

    resolve({ ...task, done });
  });

export const destroyTask = (id: number) =>
  new Promise<void>(async (resolve, reject) => {
    await sleep();

    tasks = tasks.filter((task) => task.id !== id);
    resolve();
  });
