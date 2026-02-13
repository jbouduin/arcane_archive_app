export class IpcPaths {
  //#region Proprietary protocol ----------------------------------------------
  public static readonly CACHED_IMAGE = "cached-image";
  //#endregion

  //#region Infra: App --------------------------------------------------------
  public static readonly RESTART = "/restart";
  //#endregion

  //#region Infra: Configuration ----------------------------------------------
  public static readonly SYSTEM_SETTINGS = "/system-settings";
  public static readonly SYSTEM_SETTINGS_FACTORY_DEFAULT = "/system-settings/factory-default";
  public static readonly PREFERENCES = "/preferences";
  public static readonly SETTINGS = "/settings";
  //#endregion

  //#region Infra: Session ----------------------------------------------------
  public static readonly SESSION = "/session";
  public static readonly CREDENTIAL = "/credential";
  //#endregion

  //#region Infra: Io ---------------------------------------------------------
  public static readonly IO_ASSET = "/asset";
  public static readonly IO_ASSET_QUERY_PARAM_PATH = "path";

  public static getIoAssetPath(assetPath: string): string {
    return `${IpcPaths.IO_ASSET}?${IpcPaths.IO_ASSET_QUERY_PARAM_PATH}=${assetPath}`;
  }

  public static readonly IO_SELECT_DIRECTORY = "/select-directory";
  //#endregion

  //#region  Infra: Dialogs ---------------------------------------------------
  public static readonly SAVE_AS = "/save-as";
  public static readonly SAVE_AS_QUERY_PARAM_PURPOSE = "purpose";

  public static getSaveAsPath(purpose?: string): string {
    return `${IpcPaths.SAVE_AS}?${IpcPaths.SAVE_AS_QUERY_PARAM_PURPOSE}=${purpose}`;
  }

  public static readonly SELECT_FILE = "/select-file";
  public static readonly SELECT_FILE_QUERY_PARAM_PURPOSE = "purpose";

  public static getSelectFilePath(purpose?: string): string {
    return `${IpcPaths.SELECT_FILE}?${IpcPaths.SELECT_FILE_QUERY_PARAM_PURPOSE}=${purpose}`;
  }
  //#endregion

  //#region Infra: Logging ----------------------------------------------------
  public static readonly LOG_INFO = "/log/info";
  public static readonly LOG_WARNING = "/log/warning";
  public static readonly LOG_ERROR = "/log/error";
  public static readonly LOG_DEGUG = "/log/debug";
  public static readonly LOG_TRACE = "/log/trace";
  //#endregion

  //#region Infra: Windows ----------------------------------------------------
  public static readonly MAIN_WINDOW_SHOW = "/window/main/show";
  public static readonly SPLASH_WINDOW_SHOW = "/window/splash/show";
  public static readonly SPLASH_WINDOW_HIDE = "/window/splash/hide";
  public static readonly FIRST_TIME_WINDOW_SHOW = "/window/first-time/show";
  //#endregion

  //#region Library: Card Symbol ----------------------------------------------
  public static readonly CARD_SYMBOL_SVG = "/card-symbol/svg";
  public static readonly CARD_SYMBOL_REFRESH = "/card-symbol/refresh";
  //#endregion

  //#region Collections -------------------------------------------------------
  public static readonly IMPORT_COLLECTION_DATA = "/collection/import";
  //#endregion
}
