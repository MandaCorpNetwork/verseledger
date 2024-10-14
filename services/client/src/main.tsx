/// <reference types="vite/client" />
import './main.css';
import './i18n';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import { SoundEffectProvider } from './Audio/AudioManager';
import { AudioProvider } from './Audio/AudioProvider';
import { setupStore } from './Redux/store';
import { StompProvider } from './StompProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={setupStore()}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StompProvider>
        <SoundEffectProvider>
          <AudioProvider>
            <App />
          </AudioProvider>
        </SoundEffectProvider>
      </StompProvider>
    </LocalizationProvider>
  </Provider>,
);
