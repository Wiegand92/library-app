import {applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import {devToolsEnhancer} from 'redux-devtools-extension';

import bookAPI from './utils/bookAPI'
import rootReducer from './reducer';

const store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk.withExtraArgument(bookAPI)), devToolsEnhancer())  
);

export default store;
