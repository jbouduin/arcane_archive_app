import { ToastProps } from "@blueprintjs/core";
import { ConfigurationDto } from "../../../../common/dto";
import { CardQueryParamsDto, LibraryCardListDto, QueryResultDto } from "../../dto";

export interface ICollectionManagerProxyService {
  readonly logServerResponses: boolean;

  getCards(cardQuery: CardQueryParamsDto): Promise<QueryResultDto<LibraryCardListDto>>;
  getData<T extends object>(path: string): Promise<T>;
  initialize(
    configuration: ConfigurationDto,
    showToast: (props: ToastProps, key?: string) => void
  ): void;
}
