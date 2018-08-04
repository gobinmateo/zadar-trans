import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store/store.js';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons';

ReactDOM.render((
  <BrowserRouter>
    <App store={store}/>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
