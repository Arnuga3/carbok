import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

import {createStore, applyMiddleware} from 'redux';
import {Provider as ReduxProvider} from 'react-redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './redux/reducers/index';

import { defineCustomElements } from '@ionic/pwa-elements/loader';

// import './resources/fonts/Nunito-Light.ttf';
import './resources/fonts/Urbanist-Regular.ttf';

const logger = createLogger({
  collapsed: true,
  timestamp: false,
  duration: true,
});

export const store = createStore(reducer, applyMiddleware(logger, thunk));

// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App/>
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
