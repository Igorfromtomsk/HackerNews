import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.sass';
import reportWebVitals from './reportWebVitals';
import Routing from './pages';
import { Provider } from 'react-redux';
import { store } from './redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <Routing />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
