import { Button, ButtonGroup } from "@blueprintjs/core";
import { SaveCancelResetFooterProps } from "./save-cancel-reset-footer.props";

export function SaveCancelResetFooter<T extends object>(props: SaveCancelResetFooterProps<T>) {
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
              icon={props.resetButtonIcon || "refresh"}
            >
              {props.resetButtonLabel || "Undo changes"}
            </Button>
          )
        }
      </ButtonGroup>
      <ButtonGroup variant="minimal" vertical={false}>
        <Button
          key="commitButton"
          disabled={props.viewmodel.hasChanges && props.viewmodel.isValid ? false : true}
          onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => props.onCommitButtonClick(e, props.viewmodel.dto)}
          icon={props.commitButtonIcon || "floppy-disk"}
        >
          {props.commitButtonLabel || "Save"}
        </Button>
        <Button
          key="cancelButton"
          icon={props.cancelButtonIcon || "cross"}
          onClick={props.onClose}
        >
          {props.cancelButtonLabel || "Cancel"}
        </Button>
      </ButtonGroup>
    </div>
  );
  // #endregion
}
