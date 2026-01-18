import { BlueprintProvider, FocusStyleManager, OverlayToaster, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { IpcPaths } from "../../common/ipc";
import { DialogRenderer } from "../shared/components/base/base-dialog/dialog-renderer";
import { ServerNotAvailable } from "../shared/components/server-not-available/server-not-available";
import { PreferencesProvider, ServiceContainerContext, SessionProvider } from "../shared/context";
import { ServiceContainer } from "../shared/context/implementation/service.container";
import { ShowToastFn } from "../shared/types";
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

  const toastCall: ShowToastFn = (props: ToastProps, key?: string) => appToaster.show(props, key);
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
  while (initialization == null || !initialization.isOk) {
    let count = 30;

    // Show main window if not already shown
    if (!windowShown) {
      void serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.MAIN_WINDOW_SHOW);
      windowShown = true;
    }

    root.render(
      <PreferencesProvider preferences={initialization.settings!.preferences}>
        <ServerNotAvailable initializationResult={initialization} nextTry={count} />
      </PreferencesProvider>
    );

    // Countdown loop
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        count--;
        root.render(
          <PreferencesProvider preferences={initialization.settings!.preferences}>
            <ServerNotAvailable initializationResult={initialization} nextTry={count} />
          </PreferencesProvider>
        );
        if (count == 0) {
          clearInterval(interval);
          resolve();
        }
      }, 1000);
    });

    initialization = await serviceContainer.initialize(toastCall);
  }

  const [loginViewmodel, registerViewmodel] = await Promise.all([
    serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
      .getLoginViewmodel(false, serviceContainer),
    serviceContainer.viewmodelFactoryService.authenticationViewmodelFactory
      .getRegisterViewmodel(false, serviceContainer, initialization.settings!.preferences)
  ]);

  root.render(
    <BlueprintProvider>
      <ServiceContainerContext.Provider value={serviceContainer}>
        <SessionProvider sessionData={null}>
          <PreferencesProvider preferences={initialization.settings!.preferences}>
            <FirstTimeView
              systemSettings={initialization.settings!.systemConfiguration}
              loginViewmodel={loginViewmodel}
              registerViewmodel={registerViewmodel}
              preferences={initialization.settings!.preferences}
            />
            <DialogRenderer overlayService={serviceContainer.overlayService} />
          </PreferencesProvider>
        </SessionProvider>
      </ServiceContainerContext.Provider>
    </BlueprintProvider>
  );
  if (!windowShown) {
    void serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.FIRST_TIME_WINDOW_SHOW);
  }
})();
