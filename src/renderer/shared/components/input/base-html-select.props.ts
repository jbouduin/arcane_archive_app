import { HTMLSelectProps, Props } from "@blueprintjs/core";
import { BaseViewmodel } from "../../viewmodel";

// TODO create BaseInput props as superclass for the others (check base-input for all possible props)
export interface BaseHtmlSelectProps<Dto extends object> extends Props {
  /**
   * The viewmodel
   */
  viewmodel: BaseViewmodel<Dto>;
  /**
   * The fieldname. Must be the property name of one of the fields of the dto
   */
  fieldName: keyof Dto;
  viewmodelChanged: () => void;
  label: string;
  labelInfo?: string;
  selectProps?: HTMLSelectProps;
}
