import { Props } from "@blueprintjs/core";

export interface SplashScreenProps extends Props {
  isOpen: boolean;
  onDialogClose: () => void;
}
