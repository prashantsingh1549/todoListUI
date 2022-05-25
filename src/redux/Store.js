import {combineReducers, createStore} from 'redux';
import TodoReducer from './Reducer/TodoReducer';

const rootReducer = combineReducers({
  TodoReducer: TodoReducer,
});

const configureStore = () => createStore(rootReducer);

export default configureStore;
