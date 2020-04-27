import * as React from "react";
import { Task as TaskType } from "../../constants/task";
import { Task } from "./Item";
import { AddTask } from "./Add";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";

type Props = {
  loading: boolean;
  tasks: TaskType[];
};

const View: React.FC<Props> = ({ loading, tasks }) => (
  <>
    {loading && <div>loading...</div>}
    <List>
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
      <AddTask />
    </List>
  </>
);

const List = styled.ul``;

export const Tasks: React.FC = (props) => {
  const { tasks, loading } = useSelector((state: RootState) => state.tasks);
  const { filter } = useSelector((state: RootState) => state.filter);

  const currentTasks = React.useMemo(
    () =>
      (() => {
        switch (filter) {
          case "None":
            return [...tasks.filter((task) => !task.done), ...tasks.filter((task) => task.done)];
          case "InProgress":
            return tasks.filter((task) => !task.done);
          case "Done":
            return tasks.filter((task) => task.done);
        }
      })(),
    [filter, tasks],
  );

  return <View loading={loading} tasks={currentTasks} {...props} />;
};
