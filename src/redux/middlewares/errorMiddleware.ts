import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";
// import { toast } from "your-cool-library";

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (apiStore: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
      // const auth = apiStore.getState().auth;
      //   console.log({ auth });
      console.log("We got a rejected action!", action.payload);
      //   toast.warn({
      //     title: "Async error!",
      //     message:
      //       "data" in action.error
      //         ? (action.error.data as { message: string }).message
      //         : action.error.message,
      //   });
    }

    return next(action);
  };
