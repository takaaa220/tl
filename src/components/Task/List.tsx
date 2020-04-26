import * as React from "react";
import { Task as TaskType } from "../../constants/task";
import { Task } from "./Item";
import { AddTask } from "./Add";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { RootState } from "../../rootReducer";

type Props = {
  tasks: TaskType[];
};

const View: React.FC<Props> = ({ tasks }) => (
  <List>
    {tasks.map((task) => (
      <Task key={task.id} task={task} />
    ))}
    <AddTask />
  </List>
);

const List = styled.ul``;

export const Tasks: React.FC = (props) => {
  const { tasks } = useSelector((state: RootState) => state.tasks);

  return <View tasks={tasks} {...props} />;
};
