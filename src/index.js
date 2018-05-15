import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import CarList from "./components/CarList";

ReactDOM.render(<CarList />, document.getElementById('root'));
registerServiceWorker();
