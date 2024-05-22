import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './components/stateProvider/StateProvider';
import reducer, { initialState } from './components/stateProvider/reducer';

ReactDOM.render(
    <StateProvider initialState={initialState} reducer={reducer}>
        <App />
    </StateProvider>,
    document.getElementById('root')
);
