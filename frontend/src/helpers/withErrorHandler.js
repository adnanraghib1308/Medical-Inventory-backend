import { notification } from "antd";
import { path } from "ramda";

/**
 * fn: Function (Makes an API call) that returns a promise
 */
export default (fn, { errorCallback } = {}) => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.log(error);
      let errorMessage;
      const errors = path(["response", "data", "errors"], error);
      if (errors && errors[0]) {
        errorMessage = errors.map((err) => err.title).join("\n");
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (errorMessage) {
        notification["error"]({ message: errorMessage });

        if (errorCallback) await errorCallback(errorMessage);
      }
    }
  };
};
