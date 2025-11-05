export interface ICardImageService {
  getImage(url: URL): Promise<Response>;
}
