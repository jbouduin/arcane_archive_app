export interface IScryfallClient {
  // fetch(uri: string | URL): Promise<Response>;
  fetchArrayBuffer(uri: string | URL): Promise<ArrayBuffer>;
}
