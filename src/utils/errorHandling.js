import { ErrorClass } from "./errorClass.js";

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    return fn(req, res, next).catch((error) => {
      return next(new ErrorClass(error.message, error.status));
    });
  };
};

export const globalErrorHandling = (error, req, res, next) => {
  return res.status(error.status || 400).json({
    message: "G error",
    mesgError: error.message,
    stack: error.stack,
  });
};
