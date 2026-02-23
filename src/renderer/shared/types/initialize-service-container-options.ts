export type InitializeServiceContainerOptions = {
  // --- Skippable services that do not execute calls during initialization ---
  skipCollectionCardSearchService?: boolean;
  skipCollectionService?: boolean;
  skipLibraryCardService?: boolean;
  skipMtgCardService?: boolean;
  skipSynchronizeService?: boolean;
  // --- Skippable services that return Promises ---
  skipCardSymbolService?: boolean;
  skipDisplayValueService?: boolean;
  skipSessionService?: boolean;
  skipMtgSetService?: boolean;
};
