import React, {Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './libs/routes'
import {persistor, store} from './store'
import {Provider} from 'react-redux'
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Suspense fallback="loading">
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <RouterProvider router={router} />
            </PersistGate>
        </Provider>
    </Suspense>
);
