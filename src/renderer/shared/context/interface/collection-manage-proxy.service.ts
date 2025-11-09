import { ToastProps } from "@blueprintjs/core";
import { ConfigurationDto } from "../../../../common/dto";

export interface ICollectionManagerProxyService {
  readonly logServerResponses: boolean;
  getData<T extends object>(path: string): Promise<T>;
  initialize(
    configuration: ConfigurationDto,
    showToast: (props: ToastProps, key?: string) => void
  ): void;
}
