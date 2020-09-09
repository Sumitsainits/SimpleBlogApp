import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import logger from 'redux-logger'

import { composeWithDevTools } from 'redux-devtools-extension';



const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(logger)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);