import { baseApi } from './api/baseApi';
import globalStateReducer from './slice/globalState';
import authReducer from './slice/authSlice';

export const reducer = {
    globalState: globalStateReducer,
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
};
