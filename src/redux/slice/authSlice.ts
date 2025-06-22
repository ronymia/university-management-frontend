import { createSlice } from '@reduxjs/toolkit';
import { authApi } from '../api/authApi';
import { getFromLocalStorage, setToLocalStorage } from '@/utils/local-storage';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        permission: [],
        user: getFromLocalStorage('user')
            ? JSON.parse(getFromLocalStorage('user') as string)
            : null,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(authApi.endpoints.userLogin.matchFulfilled, (state, action) => {
            console.log({ payload: action.payload });
            state.user = action.payload.user;
            state.token = action.payload.accessToken;
            state.permission = action.payload.permission;
            setToLocalStorage('user', JSON.stringify(action.payload.user));
        });
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
