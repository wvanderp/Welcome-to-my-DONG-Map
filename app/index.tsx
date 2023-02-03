import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.sass';

import App from './App';

const app = document.querySelector('#app');

if (app === null) {
    throw new Error('#app not found');
}

const root = ReactDOM.createRoot(app);
root.render(<App />);
