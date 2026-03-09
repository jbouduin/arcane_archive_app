import { ProgressCallbackValue } from "../../../../common/ipc";

export type ArcaneArchiveRequestOptions = {
  /**
   * Suppress showing a toast with the success message from the response.
   * Defaults to false
   */
  suppressErrorMessage?: boolean;
  /**
   * Suppress showing a toast with validation errors or error messages.
   * Defaults to true
   */
  suppressSuccessMessage?: boolean;
  /**
   * Suppress showing a toast when the session has expired.
   * Defaults to false
   */
  suppressInvalidSessionHandling?: boolean;
  /**
   * An optional {@link AbortSignal}
   * <p>If passed make sure the Abort Exception is handled.
   */
  signal?: AbortSignal;
  /**
   * Do not show the splash screen, even if response time goes over 1 sec
   */
  suppressSplashScreen?: boolean;
  /**
   * Progress call back value, used when displaying the splash screen for long running requests.
   * (Response time > 1 second). When not provided, the splash screen displays "Hold on..."
   */
  progressCallBackValue?: ProgressCallbackValue;
};
