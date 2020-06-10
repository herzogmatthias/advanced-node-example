import * as React from "react";

export interface ILandingProps {}

export default function Landing(props: ILandingProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Blogster!</h1>
      Write private blogs
    </div>
  );
}
