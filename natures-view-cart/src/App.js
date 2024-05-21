import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Header from "../src/components/Header/Header"
import { StateProvider } from '../src/components/StateProvider'
import reducer, { initialState } from './reducers/reducer';
ReactDOM.render(
  <React.StrictMode>
    <StateProvider initialState={initialState} reducer={reducer}>
      <App />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;
