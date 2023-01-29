import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as AppConstants from './AppConstants';

function App() {
  const router = createBrowserRouter(AppConstants.CW_ROUTES)

  return (
    <div className="cw-app-container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App
