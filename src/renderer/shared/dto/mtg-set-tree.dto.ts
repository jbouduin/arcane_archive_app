export type MtgSetTreeDto = {
  id: number;
  code: string;
  setName: string;
  parentId: number | null;
  baseSetSize: number;
  keyruneCode: string;
  type: string;
  releaseDate: Date;
  block: string | null;
  partialPreview: boolean;
  tokenSetCode: string | null;
};
