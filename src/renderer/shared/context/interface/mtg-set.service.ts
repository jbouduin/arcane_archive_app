import { ApiConfigurationDto } from "../../../../common/dto";
import { MtgSetDto } from "../../dto";

export interface IMtgSetService {
  readonly allSets: Array<MtgSetDto>;
  initialize(apiConfiguration: ApiConfigurationDto): Promise<void>;
}
