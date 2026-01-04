import { ValidationErrorDto } from "./validation-error.dto";

export type ResultDto<T> = {
  data: T;
  errors: Array<string>;
  status: string;
  successMessage: string;
  validationErrors: Array<ValidationErrorDto>;
};
