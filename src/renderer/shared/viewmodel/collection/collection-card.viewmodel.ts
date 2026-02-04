import { CollectionCardDto, CollectionCardQuantityDto } from "../../dto";
import { CardConditionDto } from "../../dto/card-condition.dto";
import { SelectOption } from "../../types";
import { BaseViewmodel, ViewmodelMode } from "../base.viewmodel";
import { CollectionCardQuantityViewmodel } from "./collection-card-quantity.viewmodel";

export class CollectionCardViewmodel extends BaseViewmodel<CollectionCardDto> {
  //#region Private fields ----------------------------------------------------
  private _allQuantitiesViewmodels: Array<CollectionCardQuantityViewmodel>;
  private foilQuantitiesViewmodels: Map<string, CollectionCardQuantityViewmodel>;
  private nonFoilQuantitiesViewmodels: Map<string, CollectionCardQuantityViewmodel>;
  //#endregion

  //#region Getters/Setters ---------------------------------------------------
  public get isValid(): boolean {
    return super.isValid &&
      this._allQuantitiesViewmodels.some((vm: CollectionCardQuantityViewmodel) => vm.quantity > 0);
  }

  public get setCode(): string {
    return this._dto.setCode;
  }

  public set setCode(value: string) {
    this._dto.setCode = value;
  }

  public get cardCode(): string {
    return this._dto.cardCode;
  }

  public set cardCode(value: string) {
    this._dto.cardCode = value;
  }
  //#endregion

  //#region BaseViewmodel Members ---------------------------------------------
  override get dtoToSave(): CollectionCardDto {
    return {
      ...this._dto,
      quantities: this.getChangedQuantityViewmodels().map((vm: CollectionCardQuantityViewmodel) => vm.dto)
    };
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(
    dto: CollectionCardDto,
    mode: ViewmodelMode,
    cardConditions: Array<SelectOption<CardConditionDto>>
  ) {
    super(dto, mode);
    this.foilQuantitiesViewmodels = new Map<string, CollectionCardQuantityViewmodel>();
    this.nonFoilQuantitiesViewmodels = new Map<string, CollectionCardQuantityViewmodel>();
    this._allQuantitiesViewmodels = new Array<CollectionCardQuantityViewmodel>();
    cardConditions.forEach((cc: SelectOption<CardConditionDto>) => {
      this.registerQuantityViewmodel(cc.value.condition, true);
      this.registerQuantityViewmodel(cc.value.condition, false);
    });
  }

  private registerQuantityViewmodel(condition: string, foil: boolean): void {
    const quantity: CollectionCardQuantityDto = this.dto.quantities.find((cardQuantity: CollectionCardQuantityDto) =>
      cardQuantity.condition == condition && cardQuantity.foil == foil) ||
      { condition: condition, foil: foil, quantity: 0 };
    const viewmodel = new CollectionCardQuantityViewmodel(quantity, this.mode);
    this.registerChildViewmodel(viewmodel);
    this._allQuantitiesViewmodels.push(viewmodel);
    if (foil) {
      this.foilQuantitiesViewmodels.set(condition, viewmodel);
    } else {
      this.nonFoilQuantitiesViewmodels.set(condition, viewmodel);
    }
  }
  //#endregion

  //#region Public methods ----------------------------------------------------
  public getQuantityViewmodel(condition: string, foil: boolean): CollectionCardQuantityViewmodel {
    return foil
      ? this.foilQuantitiesViewmodels.get(condition)!
      : this.nonFoilQuantitiesViewmodels.get(condition)!;
  }

  public getChangedQuantityViewmodels(): Array<CollectionCardQuantityViewmodel> {
    return this._allQuantitiesViewmodels.filter((vm: CollectionCardQuantityViewmodel) => vm.hasChanges);
  }
  //#endregion
}
