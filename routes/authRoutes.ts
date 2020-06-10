import e from "express";
import passport from "passport";

export const authRoutes = (app: e.Express) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req: e.Request, res: e.Response) => {
      res.redirect("/blogs");
    }
  );

  app.get("/auth/logout", (req: e.Request, res: e.Response) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req: e.Request, res: e.Response) => {
    res.send(req.user);
  });
};
