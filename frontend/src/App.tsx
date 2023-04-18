import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

import * as AppConstants from './AppConstants';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter(AppConstants.CW_ROUTES)

  return (
    <div className="cw-app-container">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
