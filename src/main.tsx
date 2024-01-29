/// reference types="vite/client"
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import backgroundvideo from './Assets/media/backgroundvideo.webm?url';
import { backgroundVideo } from './main.scss';

import App from './App';
import store from './Redux/store.js';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <video autoPlay loop id="backgroundvideo"><source src={backgroundvideo}></source></video>
      <App />
    </Provider>
  </React.StrictMode>,
);
