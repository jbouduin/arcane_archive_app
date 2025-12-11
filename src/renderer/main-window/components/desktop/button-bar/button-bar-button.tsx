import { Button, Popover, Tooltip } from "@blueprintjs/core";
import * as React from "react";
import { SvgRenderer } from "../../../../shared/components/svg-renderer";
import { IServiceContainer, ServiceContainerContext } from "../../../../shared/context";
import { EButtonBarButtonType } from "./button-bar-button-type.enum";
import { ButtonBarButtonProps } from "./button-bar-button.props";

// TODO build svg cache service or memoize button because after login svg's are retrieved again
export function ButtonBarButton(props: ButtonBarButtonProps) {
  // #region State ------------------------------------------------------------
  const [svg, setSvg] = React.useState<string | undefined>(undefined);
  // #endregion

  // #region Context --------------------------------------------------------------------
  const serviceContainer = React.useContext<IServiceContainer>(ServiceContainerContext);
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
      void serviceContainer.ipcProxy.getData<string>(`/asset?path=${props.assetPath}`)
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
        placement="right"
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
        placement="right"
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
