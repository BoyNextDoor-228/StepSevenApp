import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk'
import { todoReducer } from "./todoReducer";
import { userReducer } from "./userReducer";
import { mainSystemReducer } from "./mainSystemReducer";

import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore } from "redux-persist";

const persistConfig = {
    key: 'root',
    storage
}

export const rootReducer = combineReducers({
    user: userReducer,
    todo: todoReducer,
    system: mainSystemReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(persistedReducer, compose(applyMiddleware(thunk)))
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof rootReducer>