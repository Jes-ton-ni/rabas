import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NextUIProvider } from '@nextui-org/react';
import App from './App.jsx';
import './index.css';
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import store from './redux/store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </StrictMode>
  </Provider>
);