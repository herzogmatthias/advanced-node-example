import { NativeError } from "mongoose";

declare global {
  namespace mongoose {
    class DocumentQuery<T> extends DocumentQuery {
      exec(callback?: (error: NativeError, res: T) => void): Promise<void>;
    }
  }
}
