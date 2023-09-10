import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core';
import { Provider } from 'react-redux';

import App from '@/App.tsx';
import ErrorBoundary from '@/components/hoc/ErrorBoundary';
import { store } from '@/store';

import './index.scss';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Provider store={store}>
          <ToastContainer />
          <MantineProvider>
            <App />
          </MantineProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);
