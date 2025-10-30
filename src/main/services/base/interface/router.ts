import { IRouterService } from "../../infra/interface";

export interface IRouter {
  setRoutes(router: IRouterService): void;
}
