import * as React from "react";

export interface IBlogFieldProps {
  input: React.InputHTMLAttributes<any>;
  label: string;
  meta: {
    error: boolean;
    touched: boolean;
  };
}

export default function BlogField({
  input,
  label,
  meta: { error, touched },
}: IBlogFieldProps) {
  return (
    <div className={input.name}>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
}
