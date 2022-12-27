import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as AppConstants from './AppConstants';

const router = createBrowserRouter(AppConstants.CW_ROUTES)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// NOTE: Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
