import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import authReducer from './authSlice';
import jobReducer from './jobSlice';
import favoriteJobReducer from './favoriteJobSlice';
import cvReducer from './cvSlice';
import { loadFromLocalStorage } from '../helpers/localStorage';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const userFromStorage: any = loadFromLocalStorage('loginUser') || {};

export const store = configureStore({
    reducer: {
        users: usersReducer,
        auth: authReducer,
        job: jobReducer,
        favoriteJob: favoriteJobReducer,
        cv: cvReducer,
    },
    preloadedState: {
        auth: {
            user: userFromStorage,
            loading: false,
            error: null,
        },
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
