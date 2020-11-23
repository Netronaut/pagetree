import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import './App.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Routes from './Routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
