import { ToastProps } from "@blueprintjs/core";
import { ConfigurationDto } from "../../../../common/dto";
import { ResultDto, ValidationErrorDto } from "../../../../common/dto/mtg-collection";
import { CardQueryParamsDto, ColorDto, LibraryCardListDto, MtgSetDto, QueryResultDto } from "../../dto";
import { ICollectionManagerProxyService } from "../interface";

export class CollectionManagerProxyService implements ICollectionManagerProxyService {
  // #region Private fields ---------------------------------------------------
  private _logServerResponses: boolean;
  private showToast!: (props: ToastProps, key?: string) => void;
  private mtgCollectionApiRoot!: string;
  // #endregion

  // #region Constructor ------------------------------------------------------
  public constructor() {
    this._logServerResponses = false;
  }
  // #endregion

  // #region ICollectionManagerProxyService Members ---------------------------
  public get logServerResponses(): boolean {
    return this._logServerResponses;
  }

  public getCards(cardQuery: CardQueryParamsDto): Promise<QueryResultDto<LibraryCardListDto>> {
    const path = "/card/list";
    const params = new URLSearchParams();
    cardQuery.selectedAbilities.forEach((ability: string) => params.append("kw", ability));
    cardQuery.selectedActions.forEach((action: string) => params.append("kw", action));
    cardQuery.selectedCardColors.forEach((color: ColorDto) => params.append("cc", color.code));
    cardQuery.selectedCardNames.forEach((cardName: string) => params.append("cn", cardName));
    cardQuery.selectedGameFormats.forEach((gameFormat: string) => params.append("gf", gameFormat));
    cardQuery.selectedIdentityColors.forEach((color: ColorDto) => params.append("ic", color.code));
    cardQuery.selectedPowers.forEach((power: string) => params.append("pw", power));
    cardQuery.selectedProducedManaColors.forEach((color: ColorDto) => params.append("pm", color.code));
    cardQuery.selectedRarities.forEach((rarity: string) => params.append("rar", rarity));
    cardQuery.selectedSets.forEach((set: MtgSetDto) => params.append("set", set.id.toString()));
    cardQuery.selectedSubTypes.forEach((type: string) => params.append("sub", type));
    cardQuery.selectedSuperTypes.forEach((type: string) => params.append("sup", type));
    cardQuery.selectedTypes.forEach((type: string) => params.append("ty", type));
    cardQuery.selectedToughnesses.forEach((toughness: string) => params.append("tn", toughness));
    // TODO  cardnames, and wordbank catalogs
    if (params.size > 0) {
      params.append("pn", cardQuery.pageNumber.toString());
      params.append("ps", cardQuery.pageSize.toString());
      params.append("sort", `${cardQuery.sortField}:${cardQuery.sortDirection}`);
      return this.getData<QueryResultDto<LibraryCardListDto>>(path + "?" + params.toString());
    } else {
      return Promise.resolve({
        currentPageNumber: 0,
        currentPageSize: 100,
        hasMore: false,
        resultList: new Array<LibraryCardListDto>()
      });
    }
  }

  public async getData<T extends object>(path: string): Promise<T> {
    if (!path.startsWith("/")) {
      path = "/" + path;
    }
    return fetch(this.mtgCollectionApiRoot + path)
      .then(
        async (response: Response) => {
          const resultDto: ResultDto<T> = (await response.json()) as ResultDto<T>;
          if (response.status >= 400) {
            return this.processErrorResponse(path, resultDto);
          } else {
            return this.processSuccessResponse(path, resultDto);
          }
        },
        (reason: Error) => this.processRejection(path, reason)
      );
  }

  public initialize(configuration: ConfigurationDto, showToast: (props: ToastProps, key?: string) => void): void {
    this._logServerResponses = configuration.rendererConfiguration.logServerResponses;
    this.showToast = showToast;
    this.mtgCollectionApiRoot = configuration.apiConfiguration.mtgCollectionApiRoot;
  }
  // #endregion

  // #region Auxiliary Methods ------------------------------------------------
  /**
   * Process the rejection of the fetch call by showing a toast.
   * Logs the response to the console if this is configured.
   *
   * @param path   the path that was supposed to be fetched
   * @param reason the rejection reason
   * @returns      a rejected promise, with the same reason
   */
  private processRejection<T>(path: string, reason: Error): Promise<T> {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log(reason);
    }
    void this.showToast(
      {
        message: reason.message ?? "Some error occurred",
        intent: "danger",
        isCloseButtonShown: true,
        icon: "warning-sign"
      },
      path
    );
    return Promise.reject<T>(reason);
  }

  /**
   * Process a ResultDto with a status greater than or equal to 400 by showing a toast.
   * Logs the response to the console if this is configured
   * @param path the fetched path
   * @param response the resultDto
   * @returns    A rejected promise
   */
  private processErrorResponse<T>(path: string, response: ResultDto<T>): Promise<T> {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log(response);
    }
    let message: Array<string>;
    if (response.errors) {
      message = response.errors;
    } else {
      message = response.validationErrors.map((v: ValidationErrorDto) => v.errorMessage);
    }
    void this.showToast(
      {
        message: message ?? "Some error occurred",
        intent: "danger",
        isCloseButtonShown: true,
        icon: "warning-sign"
      },
      path
    );
    return Promise.reject(new Error(`Server error: ${response.status}`));
  }

  /**
   * Process a ResultDto with a status less than 400.
   * Logs the response to the console if this is configured
   * @param resultDto the resultDto
   * @returns the data contained in the ResultDto
   */
  private processSuccessResponse<T>(path: string, resultDto: ResultDto<T>): T {
    if (this.logServerResponses) {
      // eslint-disable-next-line no-console
      console.log(resultDto);
    }
    if (resultDto.successMessage && resultDto.successMessage != "OK") {
      void this.showToast(
        {
          message: resultDto.successMessage,
          intent: "success",
          isCloseButtonShown: true,
          icon: "tick"
        },
        path
      );
    }
    return resultDto.data!;
  }
  // #endregion
}
