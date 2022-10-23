import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.scss';
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import {Provider} from "react-redux";
import {setupStore} from "./stores";

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = setupStore()

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <App/>
        </Provider>
    </BrowserRouter>
);
