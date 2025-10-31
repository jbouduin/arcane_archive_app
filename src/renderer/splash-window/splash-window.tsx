import { BlueprintProvider, FocusStyleManager } from "@blueprintjs/core";
import { createRoot } from "react-dom/client";
import { SplashContent } from "../shared/components/splash";

FocusStyleManager.onlyShowFocusOnTabs();

void (async () => {
  /*
   * Wait until CSS is loaded before rendering components because some of them (like Table)
   * rely on those styles to take accurate DOM measurements.
   */
  await import("./splash-window.css");
  const container = document.getElementById("root")!;
  const root = createRoot(container);
  root.render(
    <BlueprintProvider>
      <SplashContent />
    </BlueprintProvider>
  );
})();
