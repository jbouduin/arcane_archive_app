import { Classes, Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";
import { cloneDeep } from "lodash";
import React from "react";
import { useServices } from "../../../../hooks/use-services";
import { IServiceContainer } from "../../../context";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogBodyProps } from "./base-dialog-body.props";
import { BaseDialogFooterProps } from "./base-dialog-footer.props";
import { BaseDialogProps } from "./base-dialog.props";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function BaseDialog<T extends BaseViewmodel<any>>(props: BaseDialogProps<T>) {
  // #region State ------------------------------------------------------------
  const [state, setState] = React.useState(props.viewmodel);
  // #endregion

  // #region Hooks ------------------------------------------------------------
  const serviceContainer: IServiceContainer = useServices();
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <Dialog
      {...props}
      title={props.title}
      className={serviceContainer.configurationService.rendererConfiguration.useDarkTheme ? Classes.DARK : ""}
    >
      <DialogBody>
        {renderBody()}
      </DialogBody>
      <DialogFooter>
        {renderFooter()}
      </DialogFooter>
    </Dialog>
  );

  function renderBody(): React.JSX.Element {
    const bodyProps: BaseDialogBodyProps<T> = {
      ...props,
      viewmodel: state,
      viewmodelChanged: (v: BaseViewmodel<T>) => setState(cloneDeep(v))
    };
    return props.bodyRenderer(bodyProps);
  }

  function renderFooter(): React.JSX.Element {
    const footerProps: BaseDialogFooterProps<T> = {
      ...props,
      viewmodel: state,
      viewmodelChanged: (v: BaseViewmodel<T>) => setState(cloneDeep(v))
    };
    return props.footerRenderer(footerProps);
  }
  // #endregion
}
