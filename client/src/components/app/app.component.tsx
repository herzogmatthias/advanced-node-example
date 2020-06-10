import * as React from "react";
import { fetchUserAsync } from "../../redux/user/user.actions";
import { connect, ConnectedProps } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../header/header.component";
import Dashboard from "../dashboard/dashboard.component";
import Landing from "../landing/landing.component";
import BlogNew from "../blog-new/blog-new.component";

export type IAppProps = ConnectedProps<typeof connector>;

function App({ fetchUsers }: IAppProps) {
  React.useEffect(() => {
    fetchUsers();
  });

  return (
    <div>
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Switch>
              <Route path="/blogs/new" component={BlogNew} />
              <Route path="/blogs" component={Dashboard} />
              <Route path="/" component={Landing} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

const mapDispatchToProps = {
  fetchUsers: fetchUserAsync,
};

const connector = connect(null, mapDispatchToProps);

export default connect(null, mapDispatchToProps)(App);
