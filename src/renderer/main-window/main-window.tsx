import { FocusStyleManager, OverlaysProvider, OverlayToaster, PortalProvider, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { IServiceContainer } from "../shared/context";
import { ConfigurationService } from "../shared/context/implementation/configuration.service";
import { DisplayValueService } from "../shared/context/implementation/display-value.service";
import { IpcProxyService } from "../shared/context/implementation/ipc-proxy.service";
import { LanguageService } from "../shared/context/implementation/language.service";
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
  const ipcProxyService = new IpcProxyService(toastCall);
  const configurationService = new ConfigurationService();
  await configurationService.initialize(ipcProxyService)
    .then(
      async () => {
        const languageService = new LanguageService();
        await languageService.initialize(configurationService.configuration.apiConfiguration);
        const displayValueService = new DisplayValueService();
        await displayValueService.initialize(configurationService.configuration.apiConfiguration);
        const container = document.getElementById("root")!;
        const root = createRoot(container);
        const serviceContainer: IServiceContainer = {
          languageService: languageService,
          displayValueService: displayValueService,
          configurationService: configurationService,
          ipcProxy: ipcProxyService
        };

        root.render(
          <OverlaysProvider>
            <PortalProvider>
              <ServiceContainerContext.Provider value={serviceContainer}>
                <MainWindowDesktop toastCall={toastCall} />
              </ServiceContainerContext.Provider>
            </PortalProvider>
          </OverlaysProvider>
        );
      }
    );
})();
