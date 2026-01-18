import { HTMLSelectProps } from "@blueprintjs/core";
import { BaseProps } from "./base.props";

export interface BaseHtmlSelectProps<Dto extends object> extends BaseProps<Dto> {
  selectProps?: HTMLSelectProps;
}
