import { Props } from "@blueprintjs/core";
import { BaseViewmodelNew } from "../../../viewmodel/base.viewmodel-new";

export interface LabelValueItemProps<Dto extends object> extends Props {
  viewmodel: BaseViewmodelNew<Dto>;
  fieldName: keyof Dto;
  fieldType: "string" | "number" | "boolean" | "date";
  default?: string;
}
