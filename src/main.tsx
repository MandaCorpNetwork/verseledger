/// <reference types="vite/client" />
import React from 'react';
import './main.scss';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { backgroundVideo } from './main.scss';

import App from './App';
import backgroundvideo from './Assets/media/backgroundvideo.webm';
import store from './Redux/store.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <video autoPlay loop muted id="videobg">
        <source src={backgroundvideo}></source>
      </video>
    </Provider>
  </React.StrictMode>,
);
