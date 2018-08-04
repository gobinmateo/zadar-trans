import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Store from './stores/Store';

import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'material-icons';

ReactDOM.render((
  <BrowserRouter>
    <Provider Store={Store}>
      <App />
    </Provider>
  </BrowserRouter>
), document.getElementById('root'));

registerServiceWorker();
