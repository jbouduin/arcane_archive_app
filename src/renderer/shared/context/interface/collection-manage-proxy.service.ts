import { ToastProps } from "@blueprintjs/core";
import { ConfigurationDto } from "../../../../common/dto";
import { CardQueryParamsDto, LibraryCardListDto, QueryResultDto } from "../../dto";

export interface ICollectionManagerProxyService {
  readonly logServerResponses: boolean;

  /**
   * Query cards
   * @param cardQuery the query parameters
   */
  getCards(cardQuery: CardQueryParamsDto): Promise<QueryResultDto<LibraryCardListDto>>;
  /**
   * Fetch data from backend
   * @param path the path
   */
  getData<T extends object>(path: string): Promise<T>;
  initialize(
    configuration: ConfigurationDto,
    showToast: (props: ToastProps, key?: string) => void
  ): void;
  postData<Req extends object, Res extends object>(path: string, data: Req): Promise<Res>;
}
