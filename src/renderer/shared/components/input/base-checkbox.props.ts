import { CheckboxProps, Props } from "@blueprintjs/core";
import { BaseViewmodelNew } from "../../viewmodel/base.viewmodel-new";
import { ReactNode } from "react";

export interface BaseCheckBoxProps<Dto extends object> extends Props {
  /**
    * The viewmodel
    */
  viewmodel: BaseViewmodelNew<Dto>;
  /**
   * The fieldname. Must be the property name of one of the fields of the dto
   */
  fieldName: keyof Dto;
  viewmodelChanged: () => void;
  checkBoxProps?: CheckboxProps;
  children: ReactNode;
}
