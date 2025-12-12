import { Classes } from "@blueprintjs/core";
import { useCallback, useEffect, useState } from "react";
import { useServices } from "../../../hooks/use-services";
import { PreferencesContext } from "../shared.context";

export function PreferencesProvider({ children }: { children: React.ReactNode; }) {
  // #region callback ---------------------------------------------------------
  const toThemeName = useCallback((darkTheme: boolean) => darkTheme ? Classes.DARK : "", []);
  // #endregion

  // #region State ------------------------------------------------------------
  const configurationService = useServices().configurationService;
  const [theme, setTheme] = useState<string>(toThemeName(configurationService.configuration.preferences.useDarkTheme));
  // #endregion

  // #region Effects ----------------------------------------------------------
  useEffect(
    () => {
      const unsubscribe = configurationService.subscribe(() => {
        setTheme(toThemeName(configurationService.preferences.useDarkTheme));
      });
      return unsubscribe;
    },
    [configurationService]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <PreferencesContext.Provider value={{ themeClassName: theme }}>
      {children}
    </PreferencesContext.Provider>
  );
  // #endregion
}
