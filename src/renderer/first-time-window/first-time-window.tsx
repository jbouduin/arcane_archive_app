import { BlueprintProvider, FocusStyleManager, OverlayToaster, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { IServiceContainer, ServiceContainerContext } from "../shared/context";
import { CardSymbolService } from "../shared/context/implementation/card-symbol.service";
import { ColorService } from "../shared/context/implementation/color.service";
import { ConfigurationService } from "../shared/context/implementation/configuration.service";
import { DisplayValueService } from "../shared/context/implementation/display-value.service";
import { IpcProxyService } from "../shared/context/implementation/ipc-proxy.service";
import { LanguageService } from "../shared/context/implementation/language.service";
import { MtgSetService } from "../shared/context/implementation/mtg-set.service";
import { ViewmodelFactoryService } from "../shared/context/implementation/viewmodel-factory.service";
import { ConfigurationViewModel } from "../shared/viewmodel";
import { FirstTimeView } from "./first-time-view/first-time-view";
import { CollectionManagerProxyService } from "../shared/context/implementation/collection-manage-proxy.service";
import { CardSearchParamService } from "../shared/context/implementation/card-search-param.service";

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

  const ipcProxyService = new IpcProxyService();
  ipcProxyService.initialize((props: ToastProps, key?: string) => appToaster.show(props, key));
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
          cardSearchParamService: new CardSearchParamService(),
          cardSymbolService: new CardSymbolService(),
          collectionManagerProxy: new CollectionManagerProxyService(),
          colorService: new ColorService(),
          configurationService: configurationService,
          displayValueService: new DisplayValueService(),
          ipcProxy: ipcProxyService,
          languageService: new LanguageService(),
          mtgSetService: new MtgSetService(),
          viewmodelFactoryService: new ViewmodelFactoryService(),
          initialize: function (_showToast: (props: ToastProps, key?: string) => void): Promise<void> {
            throw new Error("Function not implemented.");
          }
        };
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
