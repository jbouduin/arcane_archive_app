import { BlueprintProvider, FocusStyleManager, H1, OverlayToaster, Position, ToastProps } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { ServiceContainerContext, SessionProvider } from "../shared/context";
import { DialogRenderer } from "../shared/components/base/base-dialog/dialog-renderer";
import { ServiceContainer } from "../shared/context/implementation/service.container";
import { FirstTimeView } from "./first-time-view/first-time-view";
import { PreferencesProvider } from "../shared/context/providers/preferences-provider";
import { SystemSettingsDto } from "../../common/dto";
import { IpcPaths } from "../../common/ipc";

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

  serviceContainer
    .initialize(
      toastCall,
      {
        skipCardSearchService: true,
        skipColorService: true,
        skipCardSymbolService: true,
        skipLanguageService: true,
        skipMtgSetService: true,
        skipSessionService: true,
      }
    )
    .then(
      async () => {
        const systemSettings = await serviceContainer.ipcProxy.getData<SystemSettingsDto>(IpcPaths.SYSTEM_SETTINGS_FACTORY_DEFAULT);
        root.render(
          <BlueprintProvider>
            <ServiceContainerContext.Provider value={serviceContainer}>
              <SessionProvider>
                <PreferencesProvider>
                  <FirstTimeView systemSettings={systemSettings} />
                  <DialogRenderer dialogService={serviceContainer.dialogService} />
                </PreferencesProvider>
              </SessionProvider>
            </ServiceContainerContext.Provider>
          </BlueprintProvider>
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
    .then(() => serviceContainer.ipcProxy.postEmptyBody<never>(IpcPaths.FIRST_TIME_WINDOW_SHOW));
})();
