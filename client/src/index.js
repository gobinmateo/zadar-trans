import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import io from 'socket.io-client';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Store from './Store/Store';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons';

export const socket = io('http://localhost:8080');

ReactDOM.render((
  <BrowserRouter>
    <Provider Store={Store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
