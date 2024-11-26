import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { todoToggle } from "./todosSlice";
import { ReactComponent as TimesSolid } from "./times-solid.svg";
import { todoColorSelected, selectTodoById, todoDeleted } from "./todosSlice";
import { availableColors, capitalize } from "../filters/color";

const TodoListItem = ({ id }) => {
  const todo = useSelector((state) => selectTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch(todoToggle(todo.id));
  };
  const handleColorChanged = (e) => {
    const color = e.target.value;
    dispatch(todoColorSelected(todo.id, color));
  };
  const onDelete = () => {
    dispatch(todoDeleted(todo.id));
  };
  const colorOptions = availableColors.map((c) => {
    <option key={c} value={c}>
      {capitalize(c)}
    </option>;
  });
  return (
    <li>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={handleCompletedChanged}
        >
          <div className="segment buttons">
            <select
              className="colorPicker"
              value={color}
              style={{ color }}
              onChange={handleColorChanged}
            ></select>
            <button className="destroy" onClick={onDelete}>
              <TimesSolid />
            </button>
          </div>
        </input>
      </div>
    </li>
  );
};

export default TodoListItem;
