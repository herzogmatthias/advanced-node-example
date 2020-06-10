import e from "express";

export const requireLogin = (req: e.Request, res: e.Response, next: any) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must log in!" });
  }

  next();
};
