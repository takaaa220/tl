import * as React from "react";
import { Task as TaskType } from "../../constants/task";
import styled from "@emotion/styled";
import { useSelector, useDispatch } from "react-redux";
import { changeStateTask, deleteTask, addTask } from "../../modules/task";

type Props = {
  current: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAddTask: (e: React.FormEvent) => void;
};

const View: React.FC<Props> = ({ onAddTask, onChange, current }) => (
  <ListItem>
    <Form onSubmit={onAddTask}>
      <TextBox value={current} onChange={onChange} name="title" type="text" />
    </Form>
  </ListItem>
);

const ListItem = styled.li`
  display: flex;
  padding: 16px;
`;

const Form = styled.form`
  width: 100%;
`;

const TextBox = styled.input`
  padding: 8px;
  width: 100%;
`;

export const AddTask: React.FC = () => {
  const [title, setTitle] = React.useState("");

  const dispatch = useDispatch();

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    [setTitle],
  );

  const handleAddTask = React.useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const trimedTitle = title.trim();

      if (trimedTitle.length === 0) return;
      setTitle("");
      dispatch(addTask(trimedTitle));
    },
    [dispatch, title],
  );

  return <View current={title} onChange={handleChange} onAddTask={handleAddTask} />;
};
