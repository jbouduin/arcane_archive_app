export type MasterDataDto<T> = {
  id: number;
  code: T;
  name: Record<string, string>;
};
