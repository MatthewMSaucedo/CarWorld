import './App.scss';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as AppConstants from './AppConstants';

function App() {
  const router = createBrowserRouter(AppConstants.CW_ROUTES)

  return (
    <div className="cw-common-container">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
