import { HTMLSelectProps, Props } from "@blueprintjs/core";
import { BaseViewmodelNew } from "../../viewmodel/base.viewmodel-new";

// TODO create BaseInput props as superclass for the others (check base-input for all possible props)
export interface BaseHtmlSelectProps<Dto extends object> extends Props {
  /**
   * The viewmodel
   */
  viewmodel: BaseViewmodelNew<Dto>;
  /**
   * The fieldname. Must be the property name of one of the fields of the dto
   */
  fieldName: keyof Dto;
  viewmodelChanged: () => void;
  label: string;
  labelInfo?: string;
  selectProps?: HTMLSelectProps;
}
