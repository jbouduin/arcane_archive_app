import { FocusStyleManager, OverlaysProvider, OverlayToaster, PortalProvider, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { SessionDto } from "../../common/dto";
import { IpcPaths } from "../../common/ipc";
import { DialogRenderer } from "../shared/components/base/base-dialog/dialog-renderer";
import { ServerNotAvailable } from "../shared/components/server-not-available/server-not-available";
import { ApiStatus, PreferencesProvider, ServiceContainerContext, SessionProvider } from "../shared/context";
import { ServiceContainer } from "../shared/context/implementation/service.container";
import { ApiInfoProvider } from "../shared/context/providers/api-info-provider";
import { MainWindowDesktop } from "./components/desktop/main-window-desktop";
import { ShowToastFn } from "../shared/types";

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

  const toastCall: ShowToastFn = (props: ToastProps, key?: string) => appToaster.show(props, key);
  const serviceContainer = new ServiceContainer();
  const container = document.getElementById("root")!;
  const root = createRoot(container);
  let apiStatus: ApiStatus;
  let loginResponse!: SessionDto | null;
  // --- subscribe to events ---
  const apiStatusChangeUnsubscibe = serviceContainer.arcaneArchiveProxy.subscribeApiStatusChangeListener(
    (data: ApiStatus) => apiStatus = data
  );
  const sessionChangeUnsubscribe = serviceContainer.sessionService.subscribeSessionChangeListener(
    (data: SessionDto | null) => loginResponse = data
  );

  let initialization = await serviceContainer.initialize(toastCall);

  let mainWindowShown = false;
  while (initialization == null || !initialization.isOk) {
    let count = 30;

    root.render(
      <PreferencesProvider
        preferences={loginResponse != null
          ? loginResponse.profile.preferences
          : initialization.settings!.preferences}
      >
        <ServerNotAvailable initializationResult={initialization} nextTry={count} />
      </PreferencesProvider>
    );

    // Show main window if not already shown
    if (!mainWindowShown) {
      void serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.MAIN_WINDOW_SHOW);
      mainWindowShown = true;
    }

    // Countdown loop
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        count--;
        root.render(
          <PreferencesProvider
            preferences={loginResponse != null
              ? loginResponse.profile.preferences
              : initialization.settings!.preferences}
          >
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
  // --- unsubscribe from events ---
  apiStatusChangeUnsubscibe();
  sessionChangeUnsubscribe();

  root.render(
    <OverlaysProvider>
      <PortalProvider>
        <ServiceContainerContext.Provider value={serviceContainer}>
          <SessionProvider sessionData={loginResponse || null}>
            <PreferencesProvider preferences={loginResponse != null
              ? loginResponse.profile.preferences
              : initialization.settings!.preferences}
            >
              <ApiInfoProvider apiConfiguration={initialization.settings!.apiConfiguration!} apiStatus={apiStatus!}>
                <MainWindowDesktop toastCall={toastCall} />
                <DialogRenderer overlayService={serviceContainer.overlayService} />
              </ApiInfoProvider>
            </PreferencesProvider>
          </SessionProvider>
        </ServiceContainerContext.Provider>
      </PortalProvider>
    </OverlaysProvider>
  );
  if (!mainWindowShown) {
    void serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.MAIN_WINDOW_SHOW);
  }
})();
