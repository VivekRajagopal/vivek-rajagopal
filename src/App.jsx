import React from "react";
import { BrowserRouter as Router, NavLink, Route, Switch } from "react-router-dom";

import routes from "./routes";
import "./App.css";

const Navbar = () => (
  <div className="navbar-cont">
    {routes.map(route => (
      <NavLink key={route.path} exact className="navbar-link" activeClassName="navbar-link-active" to={route.path}>
        <span>{route.iconName} {route.name}</span>
      </NavLink>
    ))}
  </div>
);

const Routes = () =>
  routes.map(route => (
    <Route key={route.path} path={route.path} exact={route.exact} component={route.component} />
  ));

const Page404 = ({ location }) => (
  <div className="content fade-in">
    <h1>Yikes...</h1>
    <p>Couldn't find <code>{location.pathname}</code></p>
  </div>
);

const Footer = () =>
  <div className="footer">
    Created by Vivek Rajagopal
  </div>

class App extends React.Component {
  componentDidMount = () => (window.document.title = "Vivek Rajagopal");

  render = () => (
    <Router>
      <div className="router-body" onTouchMove={ev => console.log(ev)}>
        <Navbar />
        <Switch>
          {Routes()}
          <Route component={Page404} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
