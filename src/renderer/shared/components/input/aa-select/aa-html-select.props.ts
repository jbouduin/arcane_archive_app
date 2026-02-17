import { HTMLSelectProps } from "@blueprintjs/core";
import { BaseProps } from "../base.props";

export interface AaHtmlSelectProps<Dto extends object> extends BaseProps<Dto> {
  selectProps?: HTMLSelectProps;
}
