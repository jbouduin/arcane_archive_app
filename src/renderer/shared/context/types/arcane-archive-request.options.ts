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
  signal?: AbortSignal;
};
