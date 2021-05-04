import {combineReducers} from 'redux';
import books from './books/reducer'
import isLogged from './loggedIn/reducer';

export default combineReducers({books, isLogged});
