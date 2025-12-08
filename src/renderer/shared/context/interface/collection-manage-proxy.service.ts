import { ToastProps } from "@blueprintjs/core";
import { ConfigurationDto } from "../../../../common/dto";
import { CardQueryParamsDto, LibraryCardListDto, QueryResultDto } from "../../dto";
import { MtgServer } from "../../types";
import { ISessionService } from "./session.service";

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
  getData<T extends object>(
    server: MtgServer,
    path: string,
    supressSuccessMessage?: boolean): Promise<T>;
  initialize(
    sessionService: ISessionService,
    configuration: ConfigurationDto,
    showToast: (props: ToastProps, key?: string) => void
  ): void;
  postData<Req extends object, Res extends object>(
    server: MtgServer,
    path: string,
    data: Req | null,
    supressSuccessMessage: boolean
  ): Promise<Res>;
}
