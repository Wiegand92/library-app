// 3rd Party //
import React from 'react';
import reactDOM from 'react-dom';
import {Provider} from 'react-redux';

import "regenerator-runtime/runtime";

// Import tailwind first to give our styles preference //
import 'tailwindcss/tailwind.css';

// Styles //
import './styles/style.scss';

// Components //
import App from './components/App';

// Store //
import store from './store/store'


// Render //
reactDOM.render(
  (<Provider store={store}>
    <App />
  </Provider>), 
  document.getElementById('app')
);
