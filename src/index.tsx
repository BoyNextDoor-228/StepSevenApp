import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.scss';
import App from './App';
import { persistor, store } from '../src/store/reducers/index' 
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={null}>
        <App />
      </Suspense>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);