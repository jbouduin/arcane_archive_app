import { CollectionCardQuantityDto } from "../../dto";
import { BaseViewmodel, ViewmodelMode } from "../base.viewmodel";

export class CollectionCardQuantityViewmodel extends BaseViewmodel<CollectionCardQuantityDto> {
  //#region Getters/Setters ---------------------------------------------------
  public get quantity(): number {
    return this._dto.quantity;
  }

  public set quantity(value: number) {
    this._dto.quantity = value;
  }
  //#endregion

  //#region Constructor & C° --------------------------------------------------
  public constructor(dto: CollectionCardQuantityDto, mode: ViewmodelMode) {
    super(dto, mode);
    this.registerValidation("quantity", () => this.validateQuantity());
  }
  //#endregion

  //#region Auxiliary Methods -------------------------------------------------
  private validateQuantity(): void {
    if (this.quantity >= 0) {
      this.setFieldValid("quantity");
    } else {
      this.setFieldInvalid(
        "quantity",
        { helperText: "Please enter a positive value or zero", intent: "danger" }
      );
    }
  }
  //#endregion
}
