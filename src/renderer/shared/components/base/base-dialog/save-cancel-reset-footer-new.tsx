import { Button, ButtonGroup } from "@blueprintjs/core";
import { BaseViewmodelNew } from "../../../viewmodel/base.viewmodel-new";
import { SaveCancelResetFooterPropsNew } from "./save-cancel-reset-footer-new.props";

export function SaveCancelResetFooterNew<Dto extends object, Vm extends BaseViewmodelNew<Dto>>(
  props: SaveCancelResetFooterPropsNew<Dto, Vm>
) {
  // #region Set defaults -----------------------------------------------------
  const { showCommitButton = true } = props;
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <div className="dialog-footer-button-bar">
      <ButtonGroup variant="minimal" vertical={false}>
        {
          props.showResetButton &&
          (
            <Button
              key="resetButton"
              disabled={!props.viewmodel.hasChanges}
              onClick={() => {
                props.viewmodel.cancelChanges();
                props.viewmodelChanged();
              }}
              icon={props.resetButtonIcon ?? "refresh"}
            >
              {props.resetButtonLabel ?? "Undo changes"}
            </Button>
          )
        }
        {
          props.additionalLeftButtons &&
          (props.additionalLeftButtons)
        }
      </ButtonGroup>
      <ButtonGroup variant="minimal" vertical={false}>
        <Button
          key="cancelButton"
          icon={props.cancelButtonIcon ?? "cross"}
          onClick={props.onClose}
        >
          {props.cancelButtonLabel ?? "Cancel"}
        </Button>
        {
          showCommitButton &&
          (
            <Button
              key="commitButton"
              disabled={!props.viewmodel.canCommit}
              onClick={
                (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
                  if (props.viewmodel.isValid) {
                    if (props.onCommitButtonClick) {
                      props.onCommitButtonClick(e, props.viewmodel.dto);
                    } else if (props.onClose) {
                      props.onClose(e);
                    }
                  }
                }
              }
              icon={props.commitButtonIcon ?? "floppy-disk"}
            >
              {props.commitButtonLabel ?? "Save"}
            </Button>
          )
        }
      </ButtonGroup>
    </div>
  );
  // #endregion
}
