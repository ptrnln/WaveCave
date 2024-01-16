import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import configureStore from './store/store';
import csrfFetch, { restoreCSRF } from './store/csrf';
import { sessionActions, restoreSession } from './store/session';

const store = configureStore();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);


if (import.meta.env.MODE !== 'production') {
  restoreCSRF();
  window.store = store;
  store.dispatch(restoreSession())
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}
