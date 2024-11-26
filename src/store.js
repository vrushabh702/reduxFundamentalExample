import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todos/todosSlice";
import filterReducer from "./features/filters/filtersSlice.js";

const store = configureStore({
  reducer: {
    todos: todosReducer,
    filters: filterReducer,
  },
});

export default store;
