import e from "express";
import { requireLogin } from "../middlewares/requireLogin";
import Blog from "../models/Blog";
import { cleanCache } from "../middlewares/cleanCache";

export const blogRoutes = (app: e.Express) => {
  app.get(
    "/api/blogs/:id",
    requireLogin,
    async (req: e.Request, res: e.Response) => {
      const blog = await Blog.findOne({
        _user: req.user!._id,
        _id: req.params.id,
      });

      res.send(blog);
    }
  );

  app.get(
    "/api/blogs",
    requireLogin,
    async (req: e.Request, res: e.Response) => {
      const blogs = await Blog.find({ _user: req.user!._id }).cache({
        key: req.user?._id,
      });
      res.send(blogs);
    }
  );

  app.post(
    "/api/blogs",
    requireLogin,
    cleanCache,
    async (req: e.Request, res: e.Response) => {
      const { title, content } = req.body;
      const blog = new Blog({
        title,
        content,
        _user: req.user!._id,
      });

      try {
        await blog.save();
        res.send(blog);
      } catch (err) {
        res.status(400).send(err);
      }
    }
  );
};
