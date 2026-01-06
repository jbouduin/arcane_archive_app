import { PreferencesDto, SystemSettingsDto } from "../../../../../common/dto";
import { IpcPaths } from "../../../../../common/ipc";
import { IIpcProxyService, IServiceContainer } from "../../../context";
import { SystemInfoDto } from "../../../dto";
import { PreferencesViewmodel, SystemInfoViewmodel, SystemSettingsViewmodel } from "../../settings";
import { ISettingsViewmodelFactory } from "../interface";

export class SettingsViewmodelFactory implements ISettingsViewmodelFactory {
  // #region ISettingsViewmodelFactory Members --------------------------------
  public getPreferencesViewmodel(dto: PreferencesDto): PreferencesViewmodel {
    return new PreferencesViewmodel(dto);
  }

  public getSystemSettingsViewmodel(ipcProxy: IIpcProxyService, firstTime: boolean): Promise<SystemSettingsViewmodel> {
    return ipcProxy.getData<SystemSettingsDto>(IpcPaths.SYSTEM_SETTINGS)
      .then(
        (configuration: SystemSettingsDto) => this.getSystemSettingsViewmodelFromDto(configuration, firstTime));
  }

  public getSystemSettingsViewmodelFromDto(dto: SystemSettingsDto, firstTime: boolean): SystemSettingsViewmodel {
    return new SystemSettingsViewmodel(dto, firstTime);
  }

  public getSystemInfoViewmodel(serviceContainer: IServiceContainer): SystemInfoViewmodel {
    const dto: SystemInfoDto = {
      apiRoots: serviceContainer.arcaneArchiveProxy.apiRoots,
      apiStatus: serviceContainer.arcaneArchiveProxy.apiStatus
    };
    return new SystemInfoViewmodel(dto);
  }
  // #endregion
}
