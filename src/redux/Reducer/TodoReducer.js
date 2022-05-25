import {EDIT_TODO, DELETE_TODO, ADD_TODO, ALL_TODO} from '../Action/TodoType';
const initialState = {
  todoList: [],
};

const TodoReducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoList: action.body,
      };
    case EDIT_TODO:
      return {
        ...state,
        todoList: action.body,
      };

    case DELETE_TODO:
      return {
        ...state,
        todoList: state.todoList.filter(item => item.id != action.body.id),
      };
    case ALL_TODO:
      return {
        ...state,
        todoList: action.body,
      };

    default:
      return state;
  }
};

export default TodoReducer;
