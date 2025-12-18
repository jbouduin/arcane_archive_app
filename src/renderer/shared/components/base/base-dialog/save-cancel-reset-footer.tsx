import { Button, ButtonGroup } from "@blueprintjs/core";
import { SaveCancelResetFooterProps } from "./save-cancel-reset-footer.props";
import { BaseViewmodel } from "../../../viewmodel/base.viewmodel";

export function SaveCancelResetFooter<Dto extends object, Vm extends BaseViewmodel<Dto>>(props: SaveCancelResetFooterProps<Dto, Vm>) {
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
                props.viewmodelChanged(props.viewmodel);
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
              disabled={props.viewmodel.hasChanges && props.viewmodel.isValid ? false : true}
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
