export type StatusCode = 500 | 404 | 409 | 401;

export type ErrorTypes =
  | "GENERAL"
  | "VALIDATION_ERROR"
  | "NOT_FOUND"
  | "UNAUTHORIZED";

export type ErrorSchema = {
  code: number;
  error: ErrorTypes;
  statusCode: StatusCode;
};

const errors: { [x: string]: ErrorSchema } = {
  GENERAL: {
    code: 1,
    error: "GENERAL",
    statusCode: 500,
  },
  UNAUTHORIZED: {
    code: 2,
    error: "UNAUTHORIZED",
    statusCode: 401,
  },
  VALIDATION_ERROR: {
    code: 3,
    error: "VALIDATION_ERROR",
    statusCode: 409,
  },
  NOT_FOUND: {
    code: 4,
    error: "NOT_FOUND",
    statusCode: 404,
  },
};

export const getErrorByType = (type: ErrorTypes) => {
  return errors[type];
};

export default errors;
