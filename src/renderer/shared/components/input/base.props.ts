import { Props } from "@blueprintjs/core";
import { BaseViewmodel } from "../../viewmodel";

export interface BaseProps<Dto extends object> extends Props {
  /**
   * The viewmodel
   */
  viewmodel: BaseViewmodel<Dto>;
  /**
   * The fieldname. Must be the property name of one of the fields of the dto
   */
  fieldName: keyof Dto;
  /**
   * Event fired after a new value is assigned to the dto field
   */
  viewmodelChanged: () => void;
  /**
   * The fill attribute of the FormGroup that contains the InputGroup or Select
   */
  fill?: boolean;
  /**
   * The label attribute of the FormGroup that contains the InputGroup or Select.
   * If label is undefined, the margin of the formgroup is set to 0px (Standard is 16px)
   */
  label?: string;
  /**
   * The labelInfo attribute of the FormGroup that contains the InputGroup or Select
   */
  labelInfo?: string;
}
