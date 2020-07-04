export interface IAction {
  method: "get" | "post";
  path: string;
  body?: any;
}
