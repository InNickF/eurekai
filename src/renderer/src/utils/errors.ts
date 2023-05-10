import { ZodError } from "zod";

const unexpectedErrorMessage = "Unexpected error. Please try again later.";

export type ErrorReturnType = string | null;

export const parseTypeError = (error: unknown) => {
  if (error instanceof ZodError) {
    return `Invalid type(s) from API response. ${getZodErrorsAsString(error)}`;
  }

  return null;
};

type ErrorObject = {
  key: string;
  messages: string[];
};

export const extractZodErrors = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: Record<any, any>,
  keyPrefix = ""
): ErrorObject[] => {
  let errors: ErrorObject[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    const finalKey = isNaN(Number(key)) ? key : "child";
    const newKeyPrefix = keyPrefix ? `${keyPrefix}.${finalKey}` : finalKey;

    if (Array.isArray(value) && key === "_errors" && value.length > 0) {
      errors.push({ key: keyPrefix, messages: value });
    } else if (typeof value === "object" && value !== null) {
      errors = errors.concat(extractZodErrors(value, newKeyPrefix));
    }
  });

  return errors;
};

export const filterZodErrors = (errors: ErrorObject[]): ErrorObject[] => {
  const seen = new Map();

  return errors.filter((error) => {
    const key = error.key;
    const messages = error.messages.sort().toString();

    const keyAndMessages = `${key}:${messages}`;

    if (seen.has(keyAndMessages)) {
      return false;
    } else {
      seen.set(keyAndMessages, true);
      return true;
    }
  });
};

export const formattedZodErrorsToString = (errors: ErrorObject[]): string => {
  return errors
    .map((error) => {
      const key = error.key;
      const messages = error.messages.join(", ");
      return `"${key}": ${messages}.`;
    })
    .join(" | ");
};

export const getZodErrorsAsString = (error: ZodError): string => {
  return formattedZodErrorsToString(
    filterZodErrors(extractZodErrors(error.format()))
  );
};

export const getZodErrors = (error: ZodError): ErrorObject[] => {
  return filterZodErrors(extractZodErrors(error.format()));
};

export const parseAxiosError = (error: unknown): ErrorReturnType => {
  if (error instanceof Error) {
    return error.message;
  }

  return null;
};

export const parseStringError = (error: unknown): ErrorReturnType => {
  if (typeof error === "string") {
    return error;
  }

  return null;
};

export const parseArrayOfStringsError = (error: unknown): ErrorReturnType => {
  if (!Array.isArray(error)) {
    return null;
  }

  if (error.every((value) => typeof value === "string")) {
    return error.join(", ");
  }

  return null;
};

export const parseError = (
  error: unknown,
  fatalMessage?: string
): ErrorReturnType => {
  const parsers = [
    parseTypeError,
    parseAxiosError,
    parseStringError,
    parseArrayOfStringsError,
  ];

  const parsedError = parsers.reduce<ErrorReturnType>((parsedError, parser) => {
    if (parsedError) {
      return parsedError;
    }

    return parser(error);
  }, null);

  return parsedError || fatalMessage || unexpectedErrorMessage;
};
