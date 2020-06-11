declare global {
  namespace Express {
    interface Request {
      user?: { _id: string; googleId: string; displayName: string };
    }
  }
}
export {};
