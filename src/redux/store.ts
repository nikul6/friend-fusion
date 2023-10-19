import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import postSlice from './post/postSlice';
import userSlice from './user/userSlice';

export const store = configureStore({
    reducer:{
        auth: authSlice,
        post: postSlice,
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;