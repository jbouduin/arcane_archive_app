import { BlueprintProvider, Classes, FocusStyleManager, OverlayToaster, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { SystemSettingsDto } from "../../common/dto";
import { IpcPaths } from "../../common/ipc";
import { DialogRenderer } from "../shared/components/base/base-dialog/dialog-renderer";
import { ServerNotAvailable } from "../shared/components/server-not-available/server-not-available";
import { PreferencesProvider, ServiceContainerContext, SessionProvider } from "../shared/context";
import { ServiceContainer } from "../shared/context/implementation/service.container";
import { FirstTimeView } from "./first-time-view/first-time-view";

FocusStyleManager.onlyShowFocusOnTabs();

void (async () => {
  await import("../main-window/main-window.css");
  await import("./first-time-window.css");
  const appToaster = await OverlayToaster.create(
    {
      className: "recipe-toaster",
      position: Position.TOP
    },
    {
      domRenderer: (toaster, containerElement) => createRoot(containerElement).render(toaster)
    }
  );

  const toastCall = (props: ToastProps, key?: string) => appToaster.show(props, key);
  const serviceContainer = new ServiceContainer();
  const container = document.getElementById("root")!;
  const root = createRoot(container);

  let initialization = await serviceContainer.initialize(
    toastCall,
    {
      skipCardSearchService: true,
      skipColorService: true,
      skipCardSymbolService: true,
      skipLanguageService: true,
      skipMtgSetService: true,
      skipSessionService: true
    }
  );

  let windowShown = false;
  const theme = serviceContainer.configurationService.preferences.useDarkTheme ? Classes.DARK : "";
  while (initialization == null || !initialization.isOk) {
    let count = 30;

    // Show main window if not already shown
    if (!windowShown) {
      serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.MAIN_WINDOW_SHOW);
      windowShown = true;
    }

    root.render(
      <ServerNotAvailable initializationResult={initialization} nextTry={count} className={theme} />
    );

    // Countdown loop
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        count--;
        root.render(
          <ServerNotAvailable initializationResult={initialization} nextTry={count} className={theme} />
        );
        if (count == 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });

    initialization = await serviceContainer.initialize(toastCall);
  }

  const [systemSettings, loginViewmodel, registerViewmodel] = await Promise.all([
    serviceContainer.ipcProxy.getData<SystemSettingsDto>(IpcPaths.SYSTEM_SETTINGS_FACTORY_DEFAULT),
    serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getLoginViewmodel(false, serviceContainer),
    serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory.getRegisterViewmodelNew(false, serviceContainer)
  ]);

  root.render(
    <BlueprintProvider>
      <ServiceContainerContext.Provider value={serviceContainer}>
        <SessionProvider>
          <PreferencesProvider>
            <FirstTimeView
              systemSettings={systemSettings}
              loginViewmodel={loginViewmodel}
              registerViewmodel={registerViewmodel}
            />
            <DialogRenderer overlayService={serviceContainer.overlayService} />
          </PreferencesProvider>
        </SessionProvider>
      </ServiceContainerContext.Provider>
    </BlueprintProvider>
  );
  if (!windowShown) {
    serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.FIRST_TIME_WINDOW_SHOW);
  }
})();
