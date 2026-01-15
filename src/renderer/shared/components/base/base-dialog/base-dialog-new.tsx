import { Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";
import { useReducer, useRef } from "react";
import { usePreferences } from "../../../../hooks";
import { BaseViewmodelNew } from "../../../viewmodel/base.viewmodel-new";
import { BaseDialogBodyPropsNew } from "./base-dialog-body.props";
import { BaseDialogFooterPropsNew } from "./base-dialog-footer.props";
import { BaseDialogPropsNew } from "./base-dialog.props";

export function BaseDialogNew<Dto extends object, Vm extends BaseViewmodelNew<Dto>>(props: BaseDialogPropsNew<Dto, Vm>) {
  // #region State ------------------------------------------------------------
  const { themeClassName } = usePreferences();
  // Use a mutable viewmodel and force update after changes using reducer
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  const viewmodelRef = useRef(props.viewmodel);
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
    const bodyProps: BaseDialogBodyPropsNew<Dto, Vm> = {
      ...props,
      viewmodel: viewmodelRef.current,
      viewmodelChanged: () => forceUpdate()
    };
    return props.bodyRenderer(bodyProps);
  }

  function renderFooter(): React.JSX.Element {
    const footerProps: BaseDialogFooterPropsNew<Dto, Vm> = {
      ...props,
      viewmodel: viewmodelRef.current,
      viewmodelChanged: () => forceUpdate()
    };
    return props.footerRenderer(footerProps);
  }
  // #endregion
}
