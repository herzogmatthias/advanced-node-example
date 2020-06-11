import * as React from "react";
import { RootState } from "../../redux/root-reducer";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { IUser } from "../../interfaces/IUser";

export interface IHeaderProps {
  user: IUser | undefined;
}

function Header({ user }: IHeaderProps) {
  const renderContent = () => {
    console.log(user);
    if (user) {
      return [
        <li key="3" style={{ margin: "0 10px" }}>
          <Link to="/blogs">My Blogs</Link>
        </li>,
        <li key="2">
          <a href={"http://localhost:5000/auth/logout"}>Logout</a>
        </li>,
      ];
    } else {
      return (
        <li>
          <a href={"http://localhost:5000/auth/google"}>Login With Google</a>
        </li>
      );
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
  user: state.user.user,
});

export default connect(mapStateToProps, {})(Header);
