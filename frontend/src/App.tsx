import './App.scss';

// 3rd Party CSS imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

import * as AppConstants from './AppConstants';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CWCommonNavbarComponent from './cw-common/components/navbar/cw-common-navbar-component';

function App() {
  const router = createBrowserRouter(AppConstants.CW_ROUTES)

  return (
    <div className="cw-common-background-color">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
