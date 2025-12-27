export interface IBootstrapService {
  readonly appName: string;
  boot(): Promise<void>;
  restart(): void;
}
