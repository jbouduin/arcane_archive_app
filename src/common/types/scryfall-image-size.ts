export enum ScryfallImageSize {
  PNG = "PNG",
  LARGE = "large",
  NORMAL = "normal",
  SMALL = "small"
}

export type CachedImageSize = ScryfallImageSize.PNG | ScryfallImageSize.LARGE | ScryfallImageSize.NORMAL;
