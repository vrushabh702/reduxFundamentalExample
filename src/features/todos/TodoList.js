import { useSelector } from "react-redux";
import { selectFilterTodos } from "./todosSlice";
import { selectedFilteredTodoIds } from "./todosSlice";
import TodoListItem from "./TodoListItem";

const TodoList = () => {
  const todoIds = useSelector(selectedFilteredTodoIds);
  const loadingStatus = useSelector((state) => state.todos.status);

  if (loadingStatus === "loading") {
    return (
      <div className="todo-list">
        <div className="loader" />
      </div>
    );
  }
  const renderListItems = todoIds.map((todoIds) => {
    return <TodoListItem key={todoIds} id={todoIds} />;
  });
  return <ul className="todo-list">{renderListItems}</ul>;
};

export default TodoList;
