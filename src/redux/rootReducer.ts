import { baseApi } from "./api/baseApi";
import globalStateReducer from "./slice/globalState";
import authReducer from "./slice/authSlice";

export const reducer = {
  globalState: globalStateReducer,
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
};
