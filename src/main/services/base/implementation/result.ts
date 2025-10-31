import { EIpcStatus } from "../../../../common/ipc";
import { IResult } from "../interface";

export class Result<T> implements IResult<T> {
  // #region IResult fields ---------------------------------------------------
  public readonly status: EIpcStatus;
  public data!: T;
  public message?: string;
  // #endregion

  // #region Constructor & C° -------------------------------------------------
  public constructor(status: EIpcStatus, data: T | null, message?: string) {
    this.status = status;
    if (data != null) {
      this.data = data;
    }
    this.message = message;
  }
  // #endregion

  // #region IResult methods --------------------------------------------------
  public cast<U>(data: U): IResult<U> {
    return new Result<U>(this.status, data, this.message);
  }

  public castAsync<U>(data: U): Promise<IResult<U>> {
    return Promise.resolve(this.cast(data));
  }

  public continue<U>(onSuccess: (r: IResult<T>) => IResult<U>, onFailure: (r: IResult<T>) => IResult<U>): IResult<U> {
    if (this.status < EIpcStatus.BadRequest) {
      return onSuccess(this);
    } else {
      return onFailure(this);
    }
  }

  public continueAsync<U>(
    onSuccess: (r: IResult<T>) => Promise<IResult<U>>,
    onFailure: (r: IResult<T>) => Promise<IResult<U>>
  ): Promise<IResult<U>> {
    if (this.status < EIpcStatus.BadRequest) {
      return onSuccess(this);
    } else {
      return onFailure(this);
    }
  }

  public convert<U>(onSuccess: (r: T) => U, onFailure?: (r: T) => U): IResult<U> {
    let result: Result<U>;
    if (this.status < EIpcStatus.BadRequest || !onFailure) {
      result = new Result<U>(this.status, onSuccess(this.data), this.message);
    } else {
      result = new Result<U>(this.status, onFailure(this.data), this.message);
    }
    return result;
  }

  public convertAsync<U>(onSuccess: (r: T) => U, onFailure?: (r: T) => U): Promise<IResult<U>> {
    return Promise.resolve(this.convert(onSuccess, onFailure));
  }

  public processData(onSuccess?: (r: T) => void, onFailure?: (r: T) => void): IResult<T> {
    if (this.status < EIpcStatus.BadRequest) {
      if (onSuccess) {
        onSuccess(this.data);
      }
    } else {
      if (onFailure) {
        onFailure(this.data);
      }
    }
    return this;
  }

  public processResult(onSuccess?: (r: IResult<T>) => void, onFailure?: (r: IResult<T>) => void): IResult<T> {
    if (this.status < EIpcStatus.BadRequest) {
      if (onSuccess) {
        onSuccess(this);
      }
    } else {
      if (onFailure) {
        onFailure(this);
      }
    }
    return this;
  }
  // #endregion
}
