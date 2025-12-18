export class IpcPaths {
  // #region Proprietary protocol ---------------------------------------------
  public static readonly CACHED_IMAGE = "cached-image";
  // #endregion

  // #region Infra: App -------------------------------------------------------
  public static readonly RESTART = "/restart";
  // #endregion

  // #region Infra: Configuration ---------------------------------------------
  public static readonly SYSTEM_SETTINGS = "/system-settings";
  public static readonly SYSTEM_SETTINGS_FACTORY_DEFAULT = "/system-settings/factory-default";
  public static readonly PREFERENCES = "/preferences";
  public static readonly SETTINGS = "/settings";
  // #endregion

  // #region Infra: Settings --------------------------------------------------
  public static readonly SESSION = "/session";
  // #endregion

  // #region Infra: Io --------------------------------------------------------
  public static readonly IO_ASSET = "/asset";
  public static readonly IO_SELECT_DIRECTORY = "/select-directory";
  // #endregion

  // #region Infra: Windows ---------------------------------------------------
  public static readonly MAIN_WINDOW_SHOW = "/window/main/show";
  public static readonly SPLASH_WINDOW_SHOW = "/window/splash/show";
  public static readonly SPLASH_WINDOW_HIDE = "/window/splash/hide";
  public static readonly FIRST_TIME_WINDOW_SHOW = "/window/first-time/show";
  // #endregion

  // #region Library: Card Symbol ---------------------------------------------
  public static readonly CARD_SYMBOL_SVG = "/card-symbol/svg";
  // #endregion
}
