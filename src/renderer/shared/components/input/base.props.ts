import { Props } from "@blueprintjs/core";
import { BaseViewmodel } from "../../viewmodel";

export interface BaseProps<Dto extends object> extends Props {
  /**
   * The fieldname. Must be the property name of one of the fields of the dto
   */
  fieldName: keyof Dto;
  /**
   * The fill attribute of the FormGroup that contains the InputGroup or Select
   * Default `true`
   */
  fill?: boolean;
  /**
   * The label attribute of the FormGroup that contains the InputGroup or Select.
   * If label is undefined, the margin of the formgroup is set to `0px` (Standard is `16px`)
   */
  label?: string;
  /**
   * A {@link BaseViewmodel} subclass.
   */
  viewmodel: BaseViewmodel<Dto>;
  /**
   * The labelInfo attribute of the FormGroup that contains the InputGroup or Select.
   */
  labelInfo?: string;
  /**
   * Event fired after a new value is assigned to the dto field
   */
  viewmodelChanged: () => void;
}
