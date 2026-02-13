import { Props } from "@blueprintjs/core";

export interface CardSetIconProps extends Props {
  /** Rarity: default `common`` */
  rarity?: string;
  /** Default: `small` */
  size?: "small" | "large";
  keyruneCode: string;
}
