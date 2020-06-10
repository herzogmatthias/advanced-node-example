import * as React from "react";
import { reduxForm } from "redux-form";
import BlogForm from "../blog-form/blog-form.component";
import BlogFormReview from "../blog-form-review/blog-form-review.component";

export interface IBlogNewProps {}

function BlogNew(props: IBlogNewProps) {
  const [showFormReview, setShowFormReview] = React.useState(false);
  const renderContent = () => {
    if (showFormReview) {
      return <BlogFormReview onCancel={() => setShowFormReview(false)} />;
    }

    return <BlogForm onBlogSubmit={() => setShowFormReview(true)} />;
  };
  return <div>{renderContent()}</div>;
}
export default reduxForm({
  form: "blogForm",
})(BlogNew);
