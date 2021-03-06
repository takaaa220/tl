import * as React from "react";
import { Task as TaskType } from "../../constants/task";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { changeStateTask, deleteTask } from "../../modules/task";

type Props = {
  task: TaskType;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
};

const View: React.FC<Props> = ({ task, onChange, onDelete }) => (
  <ListItem>
    <input onChange={onChange} checked={task.done} type="checkbox" />
    <Title data-done={task.done}>{task.title}</Title>
    <button onClick={onDelete}>削除</button>
  </ListItem>
);

const ListItem = styled.li`
  display: flex;
  padding: 16px;
`;

const Title = styled.p`
  flex: 1;
  margin-left: 8px;

  &[data-done="true"] {
    color: lightgray;
  }
`;

type ContainerProps = {
  task: TaskType;
};

export const Task: React.FC<ContainerProps> = ({ task, ...props }) => {
  const dispatch = useDispatch();
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeStateTask({
          id: task.id,
          done: e.currentTarget.checked,
        }),
      );
    },
    [dispatch, task, changeStateTask],
  );

  const handleDelete = React.useCallback(() => {
    if (confirm("削除しますか？")) dispatch(deleteTask(task.id));
  }, [task, dispatch, deleteTask]);

  return <View task={task} onChange={handleChange} onDelete={handleDelete} {...props} />;
};
