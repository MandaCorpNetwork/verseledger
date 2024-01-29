import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import videobg from './Assets/videobg.webm?url';
import './main.scss';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <video muted autoPlay loop id='videobg'><source src={videobg}></source></video>
      <App />
    </Provider>
  </React.StrictMode>,
);
