import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import Route from './route';
import './index.css';
import reportWebVitals from './reportWebVitals';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Route />
    </Provider>,
    document.getElementById('root')
);

reportWebVitals();
