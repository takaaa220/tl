export type Task = {
  id: number;
  title: string;
  done: boolean;
  userId: number;
};

export type Filter = "None" | "Done" | "InProgress";
