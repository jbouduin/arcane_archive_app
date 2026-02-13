export type ExportSetRequest = {
  cardConditions: Array<string>;
  collectionIds: Array<number>;
  fileName: string;
  languages: Array<string>;
  setId: number;
  openFile: boolean;
};
