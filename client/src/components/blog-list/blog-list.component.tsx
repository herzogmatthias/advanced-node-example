import * as React from "react";
import map from "lodash/map";
import { Link } from "react-router-dom";
import { RootState } from "../../redux/root-reducer";
import { fetchBlogsAsync } from "../../redux/blog/blog.actions";
import { connect } from "react-redux";

export interface IBlogListProps {
  blogs: any;
  fetchBlogs(): void;
}

function BlogList({ blogs, fetchBlogs }: IBlogListProps) {
  const renderBlogs = () => {
    return map(blogs, (blog) => {
      return (
        <div className="card darken-1 horizontal" key={blog._id}>
          <div className="card-stacked">
            <div className="card-content">
              <span className="card-title">{blog.title}</span>
              <p>{blog.content}</p>
            </div>
            <div className="card-action">
              <Link to={`/blogs/${blog._id}`}>Read</Link>
            </div>
          </div>
        </div>
      );
    });
  };
  return <div>{renderBlogs()}</div>;
}

const mapStateToProps = (state: RootState) => ({
  blogs: state.blog.blogs,
});

const mapDispatchToProps = {
  fetchBlogs: fetchBlogsAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(BlogList);
