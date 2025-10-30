import { FocusStyleManager, H1, OverlaysProvider, OverlayToaster, PortalProvider, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { IpcProxyService } from "../shared/context/implementation/ipc-proxy.service";
import { IServiceContainer } from "../shared/context";
import { ServiceContainerContext } from "../shared/context/shared.context";
import { ConfigurationService } from "../shared/context/implementation/configuration.service";

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
  const ipcProxyService = new IpcProxyService(toastCall);
  const configurationService = new ConfigurationService();
  await configurationService.initialize(ipcProxyService)
    .then(
      () => {
        const container = document.getElementById("root")!;
        const root = createRoot(container);
        const serviceContainer: IServiceContainer = {
          configurationService: configurationService,
          ipcProxy: ipcProxyService
        };

        /* eslint-disable @stylistic/function-paren-newline */
        root.render(
          <OverlaysProvider>
            <PortalProvider>
              <ServiceContainerContext.Provider value={serviceContainer}>
                <H1>here we go</H1>this is a paragraph
                {/* <MainWindowDesktop toastCall={toastCall} /> */}
              </ServiceContainerContext.Provider>
            </PortalProvider>
          </OverlaysProvider>
        );
      }
    );
})();
