import { baseApi } from "./api/baseApi";
import globalStateReducer from "./slice/globalState";

export const reducer = {
  globalState: globalStateReducer,
  [baseApi.reducerPath]: baseApi.reducer,
};
