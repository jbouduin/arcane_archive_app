import { Classes, FocusStyleManager, OverlaysProvider, OverlayToaster, PortalProvider, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { IpcPaths } from "../../common/ipc";
import { DialogRenderer } from "../shared/components/base/base-dialog/dialog-renderer";
import { ServerNotAvailable } from "../shared/components/server-not-available/server-not-available";
import { PreferencesProvider, ServiceContainerContext, SessionProvider } from "../shared/context";
import { ServiceContainer } from "../shared/context/implementation/service.container";
import { ApiStatusProvider } from "../shared/context/providers/api-status-provider";
import { MainWindowDesktop } from "./components/desktop/main-window-desktop";

FocusStyleManager.onlyShowFocusOnTabs();

void (async () => {
  await import("./main-window.css");
  // await new Promise(resolve => setTimeout(resolve, 3000));
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
  let initialization = await serviceContainer.initialize(toastCall);

  let mainWindowShown = false;
  const theme = serviceContainer.configurationService.preferences.useDarkTheme ? Classes.DARK : "";
  while (initialization == null || !initialization.isOk) {
    let count = 30;

    // Show main window if not already shown
    if (!mainWindowShown) {
      serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.MAIN_WINDOW_SHOW);
      mainWindowShown = true;
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

  root.render(
    <OverlaysProvider>
      <PortalProvider>
        <ServiceContainerContext.Provider value={serviceContainer}>
          <SessionProvider>
            <PreferencesProvider>
              <ApiStatusProvider>
                <MainWindowDesktop toastCall={toastCall} />
                <DialogRenderer overlayService={serviceContainer.overlayService} />
              </ApiStatusProvider>
            </PreferencesProvider>
          </SessionProvider>
        </ServiceContainerContext.Provider>
      </PortalProvider>
    </OverlaysProvider>
  );
  if (!mainWindowShown) {
    serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.MAIN_WINDOW_SHOW);
  }
})();
