// 3rd Party //

import React from 'react';
import reactDOM from 'react-dom';

import "regenerator-runtime/runtime";

// Import tailwind first to give our styles preference //
import 'tailwindcss/tailwind.css';

// Styles //
import './styles/style.scss';

// Components //
import App from './components/App';


// Render //
reactDOM.render(<App />, document.getElementById('app'));