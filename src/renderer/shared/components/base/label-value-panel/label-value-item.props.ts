import { Props } from "@blueprintjs/core";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";

export interface LabelValueItemProps<Dto extends object> extends Props {
  viewmodel: BaseViewmodel<Dto>;
  fieldName: keyof Dto;
  fieldType: "string" | "number" | "boolean" | "date";
  default?: string;
}
