import { Classes } from "@blueprintjs/core";
import { useCallback, useEffect, useState } from "react";
import { PreferencesDto } from "../../../../common/dto";
import { useServices } from "../../../hooks";
import { PreferencesContext } from "../shared.context";
import { PreferencesProviderProps } from "./preferences-provider.props";

export function PreferencesProvider(props: PreferencesProviderProps): JSX.Element {
  //#region Memoization -------------------------------------------------------
  const toThemeName = useCallback((darkTheme: boolean) => darkTheme ? Classes.DARK : "", []);
  //#endregion

  //#region State -------------------------------------------------------------
  const { configurationService } = useServices();
  const [preferences, setPreferences] = useState<PreferencesDto>(props.preferences);
  //#endregion

  //#region Effects -----------------------------------------------------------
  useEffect(
    () => {
      const unsubscribe = configurationService.subscribePreferenceChangeListener(
        (data: PreferencesDto) => setPreferences(data)
      );
      return unsubscribe;
    },
    [configurationService]
  );
  //#endregion

  //#region Rendering ---------------------------------------------------------
  return (
    <PreferencesContext.Provider
      value={
        {
          themeClassName: toThemeName(preferences.useDarkTheme),
          preferences: preferences
        }
      }
    >
      {props.children}
    </PreferencesContext.Provider>
  );
  //#endregion
}
