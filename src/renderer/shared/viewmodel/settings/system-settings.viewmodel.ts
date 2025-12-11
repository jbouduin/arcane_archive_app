import { BaseViewmodel } from "../base.viewmodel";

// eslint-disable-next-line  @typescript-eslint/no-wrapper-object-types
export class SystemSettingsViewmodel extends BaseViewmodel<String> {
  public get value(): string {
    return this._dto.toString();
  }
}
