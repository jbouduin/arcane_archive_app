import { ArcaneArchiveServer } from "../../../../../common/types";
import { AaClientSelectProps } from "./aa-client-select.props";

export interface AaServerSelectProps<T, U, Dto extends object> extends AaClientSelectProps<T, U, Dto> {
  server: ArcaneArchiveServer;
  serverBaseUrl: string;

  itemLabel: (item: T) => string;
}
