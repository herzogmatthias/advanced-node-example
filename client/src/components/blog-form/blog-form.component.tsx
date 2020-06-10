import * as React from "react";
import BlogField from "../blog-field/blog-field.component";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import _ from "lodash";
import { Link } from "react-router-dom";
import { formFields } from "../../config";

export interface IBlogFormProps {
  onBlogSubmit(): void;
}

function BlogForm({
  handleSubmit,
  onBlogSubmit,
}: InjectedFormProps<any, IBlogFormProps> & IBlogFormProps) {
  const renderFields = () => {
    return _.map(formFields, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={BlogField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onBlogSubmit)}>
        {renderFields()}
        <Link to="/blogs" className="red btn-flat white-text">
          Cancel
        </Link>
        <button type="submit" className="teal btn-flat right white-text">
          Next
          <i className="material-icons right">done</i>
        </button>
      </form>
    </div>
  );
}

function validate(values: any) {
  const errors: { [key: string]: string } = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must provide a value";
    }
  });

  return errors;
}

export default reduxForm<any, IBlogFormProps>({
  validate,
  form: "blogForm",
  destroyOnUnmount: false,
})(BlogForm);
