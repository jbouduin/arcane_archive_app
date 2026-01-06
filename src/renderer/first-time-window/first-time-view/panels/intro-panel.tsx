import { Button, ButtonGroup, DialogBody, DialogFooter } from "@blueprintjs/core";
import { BaseFirstTimeViewPanelProps } from "./base-first-time-view-panel.props";

export function IntroPanel(props: BaseFirstTimeViewPanelProps) {
  // #region Rendering --------------------------------------------------------
  /* eslint-disable @stylistic/jsx-one-expression-per-line */
  return (
    <>
      <DialogBody className="first-time-view-panel-body">
        <h4>Welcome to Arcane Archive!</h4>
        <p>
          You're using Arcane Archive for the first time on this machine. This wizard will guide you through the basic setup.
        </p>
        <br />
        <p>
          If you already have an account, select <strong>Login</strong> to restore your preferences and continue where you left off.
        </p>
        <p>
          If you're new, choose <strong>Register</strong> to create an account. An account is required if you want to build decks or manage your collection.
        </p>
        <p>
          If you just want to browse Magic: The Gathering cards, select <strong>Continue without account</strong>. You can register later at any time.
        </p>
      </DialogBody>
      <DialogFooter>
        <div className="dialog-footer-button-bar">
          <div></div>
          <ButtonGroup>
            <Button onClick={() => props.navigateTo("login")}>Login</Button>
            <Button onClick={() => props.navigateTo("register")}>Register</Button>
            <Button onClick={() => props.navigateTo("system")}>Continue without account</Button>
          </ButtonGroup>
        </div>
      </DialogFooter>
    </>
  );
}
