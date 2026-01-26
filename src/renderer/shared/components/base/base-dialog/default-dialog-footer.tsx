import { Button, ButtonGroup } from "@blueprintjs/core";
import { BaseViewmodel } from "../../../viewmodel";
import { DefaultDialogFooterProps } from "./default-dialog-footer.props";

export function DefaultDialogFooter<Dto extends object, Vm extends BaseViewmodel<Dto>>(
  props: DefaultDialogFooterProps<Dto, Vm>
): JSX.Element {
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
                      void props.onCommitButtonClick(e, props.viewmodel.dtoToSave);
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
