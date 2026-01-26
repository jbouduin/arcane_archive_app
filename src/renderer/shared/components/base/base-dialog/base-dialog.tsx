import { Dialog, DialogBody, DialogFooter } from "@blueprintjs/core";
import { useReducer, useRef } from "react";
import { usePreferences } from "../../../../hooks";
import { BaseViewmodel } from "../../../viewmodel";
import { BaseDialogBodyProps, BaseDialogFooterProps, BaseDialogProps } from "./base-dialog.props";

export function BaseDialog<Dto extends object, Vm extends BaseViewmodel<Dto>>(
  props: BaseDialogProps<Dto, Vm>
): JSX.Element {
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
    const bodyProps: BaseDialogBodyProps<Dto, Vm> = {
      ...props,
      viewmodel: viewmodelRef.current,
      viewmodelChanged: () => forceUpdate()
    };
    return props.bodyRenderer(bodyProps);
  }

  function renderFooter(): React.JSX.Element {
    const footerProps: BaseDialogFooterProps<Dto, Vm> = {
      ...props,
      viewmodel: viewmodelRef.current,
      viewmodelChanged: () => forceUpdate()
    };
    return props.footerRenderer(footerProps);
  }
  // #endregion
}
