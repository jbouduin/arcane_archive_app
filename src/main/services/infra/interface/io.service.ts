import { IResult } from "../../base";

export interface IIoService {
  readonly defaultCacheDirectory: string;
  readonly defaultDataDirectory: string;
  readonly defaultLogDirectory: string;

  /**
   * Create a directory if it does not exist. Directory creation is invoked recursively
   *
   * @param directory the directory to create
   */
  createDirectoryIfNotExists(directory: string): void;
  /**
   * Get an asset. Supposed to be used with non binary assets. (Like JSON, SVG, TXT, ...)
   *
   * @param path path to the assets. e.g. {@code assets/img/collection.svg}
   */
  getAsset(path: string): Promise<IResult<string>>;
  /**
   * Read system settings from disk. Method is implemented as generic to keep IoService data type agnostic.
   */
  readSystemSettings<T>(): T | null;
  /**
   * Read preferences from disk. Method is implemented as generic to keep IoService data type agnostic.
   */
  readPreferences<T>(): T | null;
  /**
   * Save system settings to disk. Method is implemented as generic to keep IoService data type agnostic.
   *
   * @param configuration the configuration object
   */
  saveSystemSettings<T>(configuration: T): void;
  /**
   * Save preferences to disk. Method is implemented as generic to keep IoService data type agnostic.
   *
   * @param preferences the preferences object
   */
  savePreferences<T>(preferences: T): void;
  /**
   * Open a select Directory dialog.
   *
   * @param currentDirectory the initial directory
   */
  selectDirectory(currentDirectory: string | null): Promise<IResult<string>>;
}
