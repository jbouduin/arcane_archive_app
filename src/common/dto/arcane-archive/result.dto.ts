import { ValidationErrorDto } from "./validation-error.dto";

export type ResultDto<T> = {
  data: T;
  errors: Array<string> | null;
  status: string;
  successMessage: string | null;
  validationErrors: Array<ValidationErrorDto> | null; // NOW make nullable
};
