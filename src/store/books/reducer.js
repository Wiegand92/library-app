import {combineReducers} from 'redux';

const books = (state = [], action) => {
  switch (action.type) {
    case 'storeBooks':
      return action.books;
    default:
      return state;
  }
}

export default combineReducers({books});
