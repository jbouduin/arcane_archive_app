export class IpcPaths {
  // #region Proprietary protocol ---------------------------------------------
  public static readonly CACHED_IMAGE = "cached-image";
  // #endregion

  // #region Infra: Configuration ---------------------------------------------
  public static readonly SYSTEM_SETTINGS = "/system-settings";
  public static readonly SYSTEM_SETTINGS_FACTORY_DEFAULT = "/system-settings/factory-default";
  public static readonly PREFERENCES = "/preferences";
  public static readonly SESSION = "/session";
  public static readonly SETTINGS = "/settings";
  // #endregion

  // #region Infra: Io --------------------------------------------------------
  public static readonly IO_ASSET = "/asset";
  public static readonly IO_SELECT_DIRECTORY = "/select-directory";
  // #endregion

  // #region Library: Card Symbol ---------------------------------------------
  public static readonly CARD_SYMBOL_SVG = "/card-symbol/svg";
  // #endregion
}
