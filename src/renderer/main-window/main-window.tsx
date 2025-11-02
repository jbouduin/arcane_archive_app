import { FocusStyleManager, H1, OverlaysProvider, OverlayToaster, PortalProvider, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { ServiceContainer } from "../shared/context/implementation/service.container";
import { ServiceContainerContext } from "../shared/context/shared.context";
import { MainWindowDesktop } from "./components/desktop/main-window-desktop";

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
  serviceContainer.initialize(toastCall)
    .then(
      () => {
        root.render(
          <OverlaysProvider>
            <PortalProvider>
              <ServiceContainerContext.Provider value={serviceContainer}>
                <MainWindowDesktop toastCall={toastCall} />
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
