import { Button, Card, DialogBody, DialogFooter, Section } from "@blueprintjs/core";
import classNames from "classnames";
// import { ConfigurationDto } from "../../../common/dto";
// import { ConfigurationWrapper } from "../../shared/components/configuration";
// import { DisplayValueService, DisplayValueServiceContext, IpcProxyService, IpcProxyServiceContext } from "../../shared/context";
import { noop } from "lodash";
import React from "react";
import { SettingsDto } from "../../../common/dto";
import { IServiceContainer, ServiceContainerContext } from "../../shared/context";
import { ConfigurationViewModel } from "../../shared/viewmodel";
import { FirstTimeViewProps } from "./first-time-view.props";

export function FirstTimeView(props: FirstTimeViewProps) {
  // #region State ------------------------------------------------------------
  const [_configuration, setConfiguration] = React.useState<ConfigurationViewModel>();
  // #endregion

  // #region Effect -----------------------------------------------------------
  React.useEffect(
    () => setConfiguration(props.configuration),
    [props.configuration]
  );
  // #endregion

  // #region Rendering --------------------------------------------------------
  return (
    <Card className={classNames(props.className, "desktop-wrapper")} compact={true}>
      <Section compact={true}>
        <ServiceContainerContext.Consumer>
          {
            (serviceContainer: IServiceContainer) => (
              <>
                <DialogBody>
                  <p>Service container wrapper</p>
                </DialogBody>
                <DialogFooter>
                  <Button
                    disabled={!props.configuration.hasChanges || !props.configuration.isValid}
                    icon="floppy-disk"
                    onClick={() => {
                      void serviceContainer.configurationService
                        .saveConfiguration(props.configuration.dto)
                        .then(
                          (_saved: SettingsDto) => window.close(),
                          noop
                        );
                    }}
                  >
                    Save
                  </Button>
                  <Button
                    icon="cross"
                    onClick={() => window.close()}
                  >
                    Cancel
                  </Button>
                </DialogFooter>
              </>
            )
          }
        </ServiceContainerContext.Consumer>
      </Section>
    </Card>

  );
  // #endregion
}
