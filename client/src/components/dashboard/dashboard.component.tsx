import * as React from "react";
import { Link } from "react-router-dom";
import BlogList from "../blog-list/blog-list.component";

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  return (
    <div>
      <BlogList />
      <div className="fixed-action-btn">
        <Link to="/blogs/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
}
