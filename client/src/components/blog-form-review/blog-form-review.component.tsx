import * as React from "react";
import { formFields } from "../../config";
import { RootState } from "../../redux/root-reducer";
import { submitBlogAsync } from "../../redux/blog/blog.actions";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import _ from "lodash";

type IBlogFormReviewProps = ConnectedProps<typeof connector> &
  RouteComponentProps & {
    onCancel(): void;
  };

function BlogFormReview({
  onCancel,
  formValues,
  history,
  submitBlog,
}: IBlogFormReviewProps) {
  const [file, changeFile] = React.useState<File | null>(null);
  const renderButtons = () => {
    return (
      <div>
        <button
          className="yellow darken-3 white-text btn-flat"
          onClick={onCancel}
        >
          Back
        </button>
        <button className="green btn-flat right white-text">
          Save Blog
          <i className="material-icons right">email</i>
        </button>
      </div>
    );
  };
  const renderFields = () => {
    return _.map(formFields, ({ name, label }) => {
      return (
        <div key={name}>
          <label>{label}</label>
          <div>{formValues![name]}</div>
        </div>
      );
    });
  };
  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    submitBlog(formValues, file, history);
  };

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeFile(event.target.files![0]);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h5>Please confirm your entries</h5>
        {renderFields()}
        <h5>Add An Image</h5>
        <input onChange={onFileChange} type="file" accept="image/*"></input>
        {renderButtons()}
      </form>
    </div>
  );
}

const mapStateToProps = (state: RootState) => ({
  formValues: state.form.blogForm.values,
});

const mapDispatchToProps = {
  submitBlog: submitBlogAsync,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BlogFormReview));
