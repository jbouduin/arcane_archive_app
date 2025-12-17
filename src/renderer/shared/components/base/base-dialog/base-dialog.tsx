import { Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";
import { cloneDeep } from "lodash";
import React from "react";
import { usePreferences } from "../../../../hooks";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogBodyProps } from "./base-dialog-body.props";
import { BaseDialogFooterProps } from "./base-dialog-footer.props";
import { BaseDialogProps } from "./base-dialog.props";

export function BaseDialog<Dto extends object, Vm extends BaseViewmodel<Dto>>(props: BaseDialogProps<Dto, Vm>) {
  // #region State ------------------------------------------------------------
  const { themeClassName } = usePreferences();
  const [state, setState] = React.useState(props.viewmodel);
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <Dialog
      {...props}
      className={themeClassName}
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
    const bodyProps: BaseDialogBodyProps<Dto, Vm> = {
      ...props,
      viewmodel: state,
      viewmodelChanged: (v: Vm) => setState(cloneDeep(v))
    };
    return props.bodyRenderer(bodyProps);
  }

  function renderFooter(): React.JSX.Element {
    const footerProps: BaseDialogFooterProps<Dto, Vm> = {
      ...props,
      viewmodel: state,
      viewmodelChanged: (v: Vm) => setState(cloneDeep(v))
    };
    return props.footerRenderer(footerProps);
  }
  // #endregion
}
