import {EDIT_TODO, DELETE_TODO, ADD_TODO, ALL_TODO} from '../Action/TodoType';
const initialState = {
  todoList: [],
};

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: todoList.concat(action.body.data),
      };
    case EDIT_TODO:
      return {
        ...state,
        todoList: action.body.data,
      };

    case DELETE_TODO:
      return {
        ...state,
        todoList: action.body.data,
      };
    case ALL_TODO:
      return {
        ...state,
        todoList: action.body.data,
      };

    default:
      return state;
  }
};

export default TodoReducer;
