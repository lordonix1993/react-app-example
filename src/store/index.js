import {combineReducers, configureStore} from "@reduxjs/toolkit";
import AuthSlice from "./auth/AuthSlice";
import AppSlice from "./AppSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReduser = combineReducers({
    auth: AuthSlice,
    app: AppSlice
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReduser)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)