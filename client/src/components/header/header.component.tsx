import * as React from "react";
import { RootState } from "../../redux/root-reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export interface IHeaderProps {
  user: any;
}

function Header({ user }: IHeaderProps) {
  const renderContent = () => {
    switch (user) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href={"/auth/google"}>Login With Google</a>
          </li>
        );
      default:
        return [
          <li key="3" style={{ margin: "0 10px" }}>
            <Link to="/blogs">My Blogs</Link>
          </li>,
          <li key="2">
            <a href={"/auth/logout"}>Logout</a>
          </li>,
        ];
    }
  };
  return (
    <nav className="indigo">
      <div className="nav-wrapper">
        <Link
          to={user ? "/blogs" : "/"}
          className="left brand-logo"
          style={{ marginLeft: "10px" }}
        >
          Blogster
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state: RootState) => ({
  user: state.user,
});

export default connect(mapStateToProps, {})(Header);
