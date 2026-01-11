import { Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";
import { cloneDeep } from "lodash";
import { useReducer, useRef } from "react";
import { usePreferences } from "../../../../hooks";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";
import { BaseDialogBodyProps } from "./base-dialog-body.props";
import { BaseDialogFooterProps } from "./base-dialog-footer.props";
import { BaseDialogProps } from "./base-dialog.props";

export function BaseDialog<Dto extends object, Fn extends string, Vm extends BaseViewmodel<Dto, Fn>>(props: BaseDialogProps<Dto, Fn, Vm>) {
  // #region State ------------------------------------------------------------
  const { themeClassName } = usePreferences();
  // Use a mutable viewmodel and force update after changes using reducer
  const [_forceUpdate, forceUpdate] = useReducer(x => x + 1, 0);
  const viewmodelRef = useRef(cloneDeep(props.viewmodel));
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
    const bodyProps: BaseDialogBodyProps<Dto, Fn, Vm> = {
      ...props,
      viewmodel: viewmodelRef.current,
      onValidationCompleted: () => forceUpdate(),
      viewmodelChanged: () => forceUpdate()
    };
    return props.bodyRenderer(bodyProps);
  }

  function renderFooter(): React.JSX.Element {
    const footerProps: BaseDialogFooterProps<Dto, Fn, Vm> = {
      ...props,
      viewmodel: viewmodelRef.current,
      viewmodelChanged: () => forceUpdate()
    };
    return props.footerRenderer(footerProps);
  }
  // #endregion
}
