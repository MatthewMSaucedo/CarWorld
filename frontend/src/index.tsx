// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// Local Style
import './index.scss';
import './App.scss';

// Components
import App from './App'

// Redux
import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// NOTE: Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
