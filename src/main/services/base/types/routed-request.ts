import { WebContents } from "electron";

export type RoutedRequest<T> = {
  params: Record<string, string>;
  queryParams: Record<string, string>;
  path: string;
  route: string;
  sender: WebContents;
  data: T;
}
