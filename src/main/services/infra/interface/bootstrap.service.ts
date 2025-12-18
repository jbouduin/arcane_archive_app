export interface IBootstrapService {
  boot(): Promise<void>;
  restart(): void;
}
