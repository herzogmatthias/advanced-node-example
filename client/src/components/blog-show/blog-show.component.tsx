import * as React from "react";
import { RootState } from "../../redux/root-reducer";
import { RouteComponentProps } from "react-router";
import { fetchBlogAsync } from "../../redux/blog/blog.actions";
import { connect, ConnectedProps } from "react-redux";

export type IBlogShowProps = ConnectedProps<typeof connector> &
  RouteComponentProps<{ _id: string }>;

function BlogShow({ blog, fetchBlog, match }: IBlogShowProps) {
  React.useEffect(() => {
    fetchBlog(match.params._id);
  }, [fetchBlog, match.params._id]);
  if (!blog) {
    return <div></div>;
  }
  const renderImage = () => {
    if (blog.imageUrl) {
      return (
        <img
          alt="Blog Image"
          src={
            "https://nodejs-advanced-example-bucket.s3.eu-central-1.amazonaws.com/" +
            blog.imageUrl
          }
        ></img>
      );
    }
    return <div></div>;
  };

  const { title, content } = blog;

  return (
    <div>
      <h3>{title}</h3>
      <p>{content}</p>
      {renderImage()}
    </div>
  );
}

const mapStateToProps = (
  state: RootState,
  ownProps: RouteComponentProps<{ _id: string }>
) => ({
  blog: state.blog.blogs[ownProps.match.params._id],
});

const mapDispatchToProps = {
  fetchBlog: fetchBlogAsync,
};

const connector = connect(mapStateToProps, mapDispatchToProps);
export default connect(mapStateToProps, mapDispatchToProps)(BlogShow);
