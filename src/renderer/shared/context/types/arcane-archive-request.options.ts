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
};
