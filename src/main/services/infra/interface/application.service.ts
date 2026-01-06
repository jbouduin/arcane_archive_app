export interface IApplicationService {
  readonly applicationName: string;
  /**
   * Boot the application:
   * - create splash window
   * - run pre-boot sequence
   * - run discovery
   * - if applicable: run first usage sequence. After closing first usage window, calls the boot sequence.
   * - otherwise: run boot sequence
   */
  boot(): Promise<void>;
  /**
   * Relaunch the application. Works in packaged app only.
   */
  restart(): void;

  deleteSessionCookie(): Promise<void>;
  restoreSessionCookie(): Promise<void>;
  saveSessionCookie(): Promise<void>;
}
