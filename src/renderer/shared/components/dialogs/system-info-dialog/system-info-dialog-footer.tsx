import { Button } from "@blueprintjs/core";
import { SystemInfoDialogFooterProps } from "./system-info-dialog.props";

export function SystemInfoDialogFooter(props: SystemInfoDialogFooterProps) {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Button
        onClick={props.onClose}
      >
        OK
      </Button>
    </div>
  );
}
