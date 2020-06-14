declare module "mongoose" {
  interface DocumentQuery<
    T,
    DocType extends import("mongoose").Document,
    QueryHelpers = {}
  > {
    mongooseCollection: {
      name: any;
    };
    cache(
      options: import("../../interfaces/ICacheOptions").default = {}
    ): DocumentQuery<T, Document> & QueryHelpers;
    useCache: boolean;
    hashKey: string;
    model: T;
  }
}
export {};
