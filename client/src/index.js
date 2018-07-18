import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxPromise from 'redux-promise';

import registerServiceWorker from './registerServiceWorker'

import reducers from './reducers'
import App from './containers/app'

import './index.css'

const store = createStore(reducers, composeWithDevTools(
   applyMiddleware(ReduxPromise) 
));

const rootEl = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootEl
);

if(module.hot) {
    module.hot.accept('./containers/app', () => {
        const NextApp = require('./containers/app').default;
        ReactDOM.render(
            <Provider store={store}>
                <NextApp />
            </Provider>,
            rootEl
        )
    });
}
registerServiceWorker();
