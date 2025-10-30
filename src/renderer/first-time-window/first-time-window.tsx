import { BlueprintProvider, FocusStyleManager, OverlayToaster, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { ConfigurationViewModel } from "../shared/viewmodel";
import { IServiceContainer } from "../shared/context";
import { IpcProxyService } from "../shared/context/implementation/ipc-proxy.service";
import { ServiceContainerContext } from "../shared/context";
import { FirstTimeView } from "./first-time-view/first-time-view";
import { ConfigurationService } from "../shared/context/implementation/configuration.service";
import { LanguageService } from "../shared/context/implementation/language.service";
import { DisplayValueService } from "../shared/context/implementation/display-value.service";

FocusStyleManager.onlyShowFocusOnTabs();

void (async () => {
  await import("../main-window/main-window.css");

  const appToaster = await OverlayToaster.create(
    {
      className: "recipe-toaster",
      position: Position.TOP
    },
    {
      domRenderer: (toaster, containerElement) => createRoot(containerElement).render(toaster)
    }
  );

  const ipcProxyService = new IpcProxyService((props: ToastProps, key?: string) => appToaster.show(props, key));
  const configurationService = new ConfigurationService();
  await configurationService.initialize(ipcProxyService)
    .then(
      () => new ConfigurationViewModel(configurationService.configuration, true),
      (_r: Error) => undefined as unknown as ConfigurationViewModel
    )
    .then((configurationViewmodel: ConfigurationViewModel) => {
      const container = document.getElementById("root")!;
      const root = createRoot(container);

      if (configurationViewmodel) {
        const serviceContainer: IServiceContainer = {
          languageService: new LanguageService(),
          displayValueService: new DisplayValueService(),
          configurationService: configurationService,
          ipcProxy: ipcProxyService
        };
        /* eslint-disable @stylistic/function-paren-newline */
        root.render(
          <BlueprintProvider>
            <ServiceContainerContext.Provider value={serviceContainer}>
              <FirstTimeView className={configurationViewmodel.theme} configuration={configurationViewmodel} />
            </ServiceContainerContext.Provider>
          </BlueprintProvider>
        );
      } else {
        root.render(
          <div>
            <p><b>Unable to retrieve a default configuration.</b></p>
          </div>
        );
      }
    });
})();
