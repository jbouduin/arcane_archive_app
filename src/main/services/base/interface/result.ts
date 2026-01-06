import { EIpcStatus } from "../../../../common/ipc";

export interface IResult<T> {
  status: EIpcStatus;
  data: T;
  message?: string;

  /**
   * Convert the result to a result with a different datatype
   *
   * @param onSuccess function to be executed if the current status is not an error
   * @param onFailure function to be executed if the current status is an error
   */
  continue<U>(onSuccess: (r: IResult<T>) => IResult<U>, onFailure: (r: IResult<T>) => IResult<U>): IResult<U>;
  /**
   * Convert the result to a result promise with a different datatype
   *
   * @param onSuccess function to be executed if the current status is not an error
   * @param onFailure function to be executed if the current status is an error
   */
  continueAsync<U>(
    onSuccess: (r: IResult<T>) => Promise<IResult<U>>,
    onFailure: (r: IResult<T>) => Promise<IResult<U>>
  ): Promise<IResult<U>>;
  /**
   * Convert the data of the result, preserving the message and status.
   *
   * @param onSuccess function to be executed if the current status is not an error. If this parameter is not provided, data is undefined.
   * @param onFailure function to be executed if the current status is an error. If this parameter is not provided, data is undefined.
   */
  convert<U>(onSuccess: (r: T) => U, onFailure?: (r: T) => U): IResult<U>;
  /**
   * Convert the data of the result asynchronously, preserving the message and status.
   *
   * @param onSuccess function to be executed if the current status is not an error. If this parameter is not provided, data is undefined.
   * @param onFailure function to be executed if the current status is an error. If this parameter is not provided, data is undefined.
   */
  convertAsync<U>(onSuccess: (r: T) => U, onFailure?: (r: T) => U): Promise<IResult<U>>;
  /**
   * Convert a to a different datatype
   *
   * @param data
   */
  cast<U>(data: U): IResult<U>;
  /**
   * Convert a to a different datatype
   *
   * @param data
   */
  castAsync<U>(data: U): Promise<IResult<U>>;
  /**
   * Process the result's data
   *
   * @param onSuccess function to be executed if the current status is not an error.
   * @param onFailure function to be executed if the current status is an error.
   * @returns this
   */
  processData(onSuccess?: (r: T) => void, onFailure?: (r: T) => void): IResult<T>;
  /**
   * Process the result
   *
   * @param onSuccess function to be executed if the current status is not an error.
   * @param onFailure function to be executed if the current status is an error.
   * @returns this
   */
  processResult(onSuccess?: (r: IResult<T>) => void, onFailure?: (r: IResult<T>) => T): IResult<T>;
}
