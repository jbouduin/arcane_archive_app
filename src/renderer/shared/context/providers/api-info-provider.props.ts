import { ReactNode } from "react";
import { ApiConfigurationDto } from "../../../../common/dto";
import { ApiStatus } from "../types";

export interface ApiInfoProviderProps {
  apiStatus: ApiStatus;
  apiConfiguration: ApiConfigurationDto;
  children: ReactNode;
}
