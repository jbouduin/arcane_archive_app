import { FocusStyleManager, H1, OverlaysProvider, OverlayToaster, PortalProvider, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { DialogRenderer } from "../shared/components/base/base-dialog/dialog-renderer";
import { SessionProvider } from "../shared/context/providers/session-provider";
import { ServiceContainer } from "../shared/context/implementation/service.container";
import { ServiceContainerContext } from "../shared/context/shared.context";
import { MainWindowDesktop } from "./components/desktop/main-window-desktop";
import { PreferencesProvider } from "../shared/context/providers/preferences-provider";

FocusStyleManager.onlyShowFocusOnTabs();

void (async () => {
  await import("./main-window.css");
  await new Promise(resolve => setTimeout(resolve, 3000));
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
  // LATER: if initializing one of the services fails: toastCall is used, but as there will be
  // no window, they will never be displayed to the user
  serviceContainer.initialize(toastCall)
    .then(
      () => {
        root.render(
          <OverlaysProvider>
            <PortalProvider>
              <ServiceContainerContext.Provider value={serviceContainer}>
                <SessionProvider>
                  <PreferencesProvider>
                    <MainWindowDesktop toastCall={toastCall} />
                    <DialogRenderer dialogService={serviceContainer.dialogService} />
                  </PreferencesProvider>
                </SessionProvider>
              </ServiceContainerContext.Provider>
            </PortalProvider>
          </OverlaysProvider>
        );
      },
      (reason: unknown) => {
        root.render(
          <>
            <H1>Error initializing</H1>
            {reason}
          </>
        );
      }
    )
    .then(() => serviceContainer.ipcProxy.showMainWindow());
})();
