import {EDIT_TODO, DELETE_TODO, ADD_TODO, ALL_TODO} from './TodoType';

export const addTodo = body => ({
  type: ADD_TODO,
  body,
});

export const editTodo = body => ({
  type: EDIT_TODO,
  body,
});

export const deleteTodo = body => ({
  type: DELETE_TODO,
  body,
});

export const allTodo = body => ({
  type: ALL_TODO,
  body,
});
