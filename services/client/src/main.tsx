/// <reference types="vite/client" />
import './main.scss';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
//import backgroundvideo from './Assets/media/MenuPage/backgroundvideo.webm';
import { setupStore } from './Redux/store.js';
import { StompProvider } from './StompProvider.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={setupStore()}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StompProvider>
        <App />
      </StompProvider>
    </LocalizationProvider>
  </Provider>,
);
