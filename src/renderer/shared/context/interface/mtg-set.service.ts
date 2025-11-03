import { ApiConfigurationDto } from "../../../../common/dto";
import { MtgSetDto } from "../../dto";

export interface IMtgSetService {
  readonly allSets: Readonly<Array<MtgSetDto>>;

  getSetById(id: number): MtgSetDto | undefined;
  initialize(apiConfiguration: ApiConfigurationDto): Promise<void>;
}
