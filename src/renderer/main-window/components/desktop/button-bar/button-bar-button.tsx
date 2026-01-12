import { Button, Popover, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { IpcPaths } from "../../../../../common/ipc";
import { useServices } from "../../../../hooks";
import { SvgRenderer } from "../../../../shared/components/svg-renderer";
import { EButtonBarButtonType } from "./button-bar-button-type.enum";
import { ButtonBarButtonProps } from "./button-bar-button.props";

export function ButtonBarButton(props: ButtonBarButtonProps) {
  // #region State ------------------------------------------------------------
  const [svg, setSvg] = React.useState<string | undefined>(undefined);
  // #endregion

  // #region Context --------------------------------------------------------------------
  const serviceContainer = useServices();
  // #endregion

  // #region Event handling ---------------------------------------------------
  function onButtonClick(): void {
    if (props.onButtonClick && props.desktopView) {
      props.onButtonClick(props.desktopView);
    }
  }
  // #endregion

  // #region Effect -----------------------------------------------------------
  React.useEffect(
    () => {
      void serviceContainer.ipcProxy.getData<string>(`${IpcPaths.IO_ASSET}?path=${props.assetPath}`)
        .then(
          (response: string) => setSvg(response),
          (_r: Error) => setSvg(undefined)
        );
    },
    [props.assetPath]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <>
      {
        svg && renderButton()
      }
    </>
  );
  // #endregion

  // #region Auxiliary render methods -----------------------------------------
  function renderButton(): React.JSX.Element {
    if (props.buttonType == EButtonBarButtonType.TooltipButton) {
      return renderToolTipButton();
    } else {
      return renderMenuButton();
    }
  }

  function renderMenuButton(): React.JSX.Element {
    return (
      <Popover
        canEscapeKeyClose={true}
        content={props.menu}
        inheritDarkTheme={true}
        interactionKind="hover"
        minimal={false}
        modifiers={
          { arrow: { enabled: false } }
        }
        openOnTargetFocus={false}
        placement={props.placement}
        position={props.position}
        usePortal={true}
      >
        <Button>
          {
            svg &&
            <SvgRenderer height={30} svg={svg} width={30} />
          }
        </Button>
      </Popover>
    );
  }

  function renderToolTipButton(): React.JSX.Element {
    return (
      <Tooltip
        content={props.tooltip}
        key={props.desktopView}
        openOnTargetFocus={false}
        placement={props.placement}
        position={props.position}
        usePortal={true}
      >
        <Button onClick={onButtonClick} intent={props.intent}>
          {
            svg &&
            <SvgRenderer height={30} svg={svg} width={30} />
          }
        </Button>
      </Tooltip>
    );
  }
  // #endregion
}
