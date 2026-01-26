import { inject, singleton } from "tsyringe";
import { PreferencesDto, SettingsDto, SystemConfigurationDto } from "../../../../common/dto";
import { IpcPaths } from "../../../../common/ipc";
import { IResult, IRouter, RouteCallback, RoutedRequest } from "../../base";
import { INFRASTRUCTURE } from "../../service.tokens";
import { IConfigurationService, IRouterService } from "../interface";

@singleton()
export class ConfigurationRouter implements IRouter {
  // #region private fields ---------------------------------------------------
  private readonly configurationService: IConfigurationService;
  // #endregion

  // #region Constructor & C° -------------------------------------------------
  public constructor(@inject(INFRASTRUCTURE.ConfigurationService) configurationService: IConfigurationService) {
    this.configurationService = configurationService;
  }
  // #endregion

  // #region IRouteDestinationService methods ---------------------------------
  public setRoutes(router: IRouterService): void {
    router.registerGetRoute(IpcPaths.SYSTEM_SETTINGS, this.getSystemSettings.bind(this) as RouteCallback);
    router.registerGetRoute(IpcPaths.SYSTEM_SETTINGS_FACTORY_DEFAULT, this.getSystemSettingsFactoryDefault.bind(this) as RouteCallback);
    router.registerGetRoute(IpcPaths.SETTINGS, this.getSettings.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.SYSTEM_SETTINGS, this.saveSystemSettings.bind(this) as RouteCallback);
    router.registerPostRoute(IpcPaths.PREFERENCES, this.savePreferences.bind(this) as RouteCallback);
  }
  // #endregion

  // #region Route callbacks --------------------------------------------------
  private getSystemSettings(_request: RoutedRequest<void>): Promise<IResult<SystemConfigurationDto>> {
    return this.configurationService.getSystemSettings();
  }

  private getSystemSettingsFactoryDefault(_request: RoutedRequest<void>): Promise<IResult<SystemConfigurationDto>> {
    return this.configurationService.getSystemSettingsFactoryDefault();
  }

  private getSettings(_request: RoutedRequest<void>): Promise<IResult<SettingsDto>> {
    return this.configurationService.getSettings();
  }

  private saveSystemSettings(request: RoutedRequest<SystemConfigurationDto>): Promise<IResult<SystemConfigurationDto>> {
    return this.configurationService.saveSystemSettings(request.data);
  }

  private savePreferences(request: RoutedRequest<PreferencesDto>): Promise<IResult<PreferencesDto>> {
    return this.configurationService.savePreferences(request.data);
  }
  // #endregion
}
