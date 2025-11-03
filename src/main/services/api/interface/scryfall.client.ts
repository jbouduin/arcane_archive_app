export interface IScryfallClient {
  fetchArrayBuffer(uri: string | URL): Promise<ArrayBuffer>;
}
