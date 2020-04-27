export type Task = {
  id: number;
  title: string;
  done: boolean;
  userId: number;
  loading?: boolean;
};

export type Filter = "None" | "Done" | "InProgress";
