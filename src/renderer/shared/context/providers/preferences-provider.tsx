import { Classes } from "@blueprintjs/core";
import { useCallback, useEffect, useState } from "react";
import { PreferencesDto } from "../../../../common/dto";
import { useServices } from "../../../hooks";
import { PreferencesContext } from "../shared.context";
import { ProviderProps } from "./provider.props";

export function PreferencesProvider(props: ProviderProps) {
  // #region callback ---------------------------------------------------------
  const toThemeName = useCallback((darkTheme: boolean) => darkTheme ? Classes.DARK : "", []);
  // #endregion

  // #region State ------------------------------------------------------------
  const configurationService = useServices().configurationService;
  const [theme, setTheme] = useState<string>(toThemeName(configurationService.preferences.useDarkTheme));
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      const unsubscribe = configurationService.subscribePreferenceChangeListener(
        (data: PreferencesDto) => setTheme(toThemeName(data.useDarkTheme))
      );
      return unsubscribe;
    },
    [configurationService]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <PreferencesContext.Provider value={{ themeClassName: theme }}>
      {props.children}
    </PreferencesContext.Provider>
  );
  // #endregion
}
