import { noop } from "lodash";
import { CardConditionDto } from "../../../../../shared/dto/card-condition.dto";
import { SelectOption } from "../../../../../shared/types";
import { BaseViewmodel } from "../../../../../shared/viewmodel";
import { GetCardCallback } from "./collection-cards-dialog-factory";
import { CollectionCardsDialogDto } from "./collection-cards-dialog.dto";
import { SingleCollectionCardViewmodel } from "./single-collection-card.viewmodel";

export class CollectionCardsDialogViewmodel extends BaseViewmodel<CollectionCardsDialogDto> {
  //#region Private fields ----------------------------------------------------
  private _currentCollectionCardViewmodel!: SingleCollectionCardViewmodel;
  private getCardCallback: GetCardCallback;
  private cardCodes: Array<string>;
  private currentCardIdx = -1;
  //#endregion

  //#region public fields -----------------------------------------------------
  public readonly cardConditions: Array<SelectOption<CardConditionDto>>;
  //#endregion

  //#region Getters/Setters ---------------------------------------------------
  public get numberOfCards(): number {
    return this._dto.cardsAndLanguages.size;
  }

  public get currentCollectionCardViewmodel(): SingleCollectionCardViewmodel {
    return this._currentCollectionCardViewmodel;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  /**
   *
   * @param dto the dialog dto
   * @param collectionCardDtos the collection card dto's of the first card in the list of cardId's
   * @param getCardCallback callback for navigating through cards
   */
  public constructor(
    dto: CollectionCardsDialogDto,
    cardConditions: Array<SelectOption<CardConditionDto>>,
    getCardCallback: GetCardCallback
  ) {
    super(dto, "update");
    this.cardCodes = [...dto.cardsAndLanguages.keys()];
    this.cardConditions = cardConditions;
    this.getCardCallback = getCardCallback;
  }
  //#endregion

  //#region Overrides ---------------------------------------------------------
  public override get canCommit(): boolean {
    return this._currentCollectionCardViewmodel.canCommit;
  }

  public override cancelChanges(): void {
    this._currentCollectionCardViewmodel.cancelChanges();
  }

  public override get isValid(): boolean {
    return this._currentCollectionCardViewmodel.isValid;
  }
  //#endregion

  //#region Public methods: Navigation ----------------------------------------

  public canGetNextCard(): boolean {
    return this.currentCardIdx < this._dto.cardsAndLanguages.size - 1;
  }

  public canGetPreviousCard(): boolean {
    return this.currentCardIdx > 0;
  }

  public getNextCard(): Promise<void> {
    this.currentCardIdx++;
    const cardCode = this.cardCodes[this.currentCardIdx];
    const languages = this.dto.cardsAndLanguages.get(cardCode)!;
    return this.getCardCallback(cardCode, languages)
      .then(
        (vm: SingleCollectionCardViewmodel) => {
          this._currentCollectionCardViewmodel = vm;
        }
      );
  }

  public getPreviousCard(): Promise<void> {
    this.currentCardIdx--;
    const cardCode = this.cardCodes[this.currentCardIdx];
    const languages = this.dto.cardsAndLanguages.get(cardCode)!;
    return this.getCardCallback(cardCode, languages)
      .then(
        (vm: SingleCollectionCardViewmodel) => {
          this._currentCollectionCardViewmodel = vm;
        },
        noop
      );
  }

  public reloadCard(): Promise<void> {
    const cardCode = this.cardCodes[this.currentCardIdx];
    const languages = this.dto.cardsAndLanguages.get(cardCode)!;
    return this.getCardCallback(cardCode, languages)
      .then(
        (vm: SingleCollectionCardViewmodel) => {
          this._currentCollectionCardViewmodel = vm;
        },
        noop
      );
  }
  //#endregion
}
