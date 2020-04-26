import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../modules/filter";
import { Filter as FilterType } from "../../constants/task";
import { RootState } from "../../rootReducer";
import styled from "@emotion/styled";

type Props = {
  current: FilterType;
  onClick: (e: React.MouseEvent<HTMLLIElement>) => void;
};

const View: React.FC<Props> = ({ current, onClick }) => (
  <List>
    <Item data-active={current === "None"} data-filter="None" onClick={onClick}>
      すべて
    </Item>
    <Item data-active={current === "InProgress"} data-filter="InProgress" onClick={onClick}>
      未完了
    </Item>
    <Item data-active={current === "Done"} data-filter="Done" onClick={onClick}>
      完了済み
    </Item>
  </List>
);

const List = styled.ul`
  border-bottom: 1px solid lightgray;
  display: flex;
  width: 100%;
`;

const Item = styled.li`
  cursor: pointer;
  padding: 8px 24px;
  text-align: center;

  &[data-active="true"] {
    border-bottom: 1px solid green;
    cursor: default;
    color: green;
    font-weight: bold;
    pointer-events: none;
  }
`;

export const Filter: React.FC = () => {
  const { filter } = useSelector((state: RootState) => state.filter);
  const dispatch = useDispatch();

  const handleClick = React.useCallback(
    (e: React.MouseEvent<HTMLLIElement>) => {
      const { filter } = e.currentTarget.dataset;
      dispatch(changeFilter(filter as FilterType));
    },
    [dispatch, changeFilter],
  );

  return <View onClick={handleClick} current={filter} />;
};
