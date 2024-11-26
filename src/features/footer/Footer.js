import { useDispatch, useSelector } from "react-redux";
import { selectTodos } from "../todos/todosSlice";
import { completedTodoCleared } from "../todos/todosSlice";
import { statusFilterChanged } from "../filters/filtersSlice";

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? "" : "s";

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong>item {suffix} left
    </div>
  );
};

const statusFilter = ({ value: status, onChange }) => {
  const renderFilter = Object.keys(statusFilter).map((key) => {
    const value = statusFilter[key];
    const handleClick = () => onChange(value);
    const className = value === status ? "selected" : "";
    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    );
  });
  return (
    <div className="filter statusFitler">
      <h5>Filter by Status</h5>
      <ul>{renderFilter}</ul>
    </div>
  );
};

const colorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);

    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      onChange(color, changeType);
    };
    return (
      <label key={color}>
        <input
          type="checkbox"
          name="{color}"
          checked={checked}
          onChange={handleChange}
        ></input>
        <span className="color-black"></span>
      </label>
    );
  });
  return (
    <div className="filter colorFilters">
      <h5>Filter By Color</h5>
      <from className="colorSelection">{renderedColors}</from>
    </div>
  );
};

const Footer = () => {
  const dispatch = useDispatch();
  const todoRemaining = useSelector((state) => {
    const uncompletedTodos = selectTodos(state).filter(
      (todo) => !todo.completed
    );
    return uncompletedTodos.length;
  });

  const { status, color } = useSelector((state) => state.filter);

  const onMarkCompletedClicked = () => dispatch(allTodosCompleted());
  const onClearCompletedClicked = () => dispatch(completedTodoCleared());

  const onColorChange = (color, changeType) =>
    dispatch(colorFiltersChanged(color, changeType));

  const onStatusChange = (status) => dispatch(statusFilterChanged);

  return (
    <Footer className="footer">
      <div className="actions">
        <h5>Action</h5>
        <button className="button" onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button className="button" onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todoRemaining} />
      <statusFilter value={status} onChange={onStatusChange} />
      <colorFilters value={color} onChange={onColorChange} />
    </Footer>
  );
};

export default Footer;
