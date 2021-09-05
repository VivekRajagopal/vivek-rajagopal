import { Link } from "gatsby";
import React from "react";
import { BsCode, BsLaptop, BsPersonFill } from "react-icons/bs";
import { CgDarkMode } from "react-icons/cg";
import { toggleDarkmode } from "../utils/darkmode";
import "./Navbar.scss";

const routes = [
  { path: "/", title: "Intro", icon: BsPersonFill },
  { path: "/work", title: "Work", icon: BsLaptop },
  { path: "/blog", title: "Blog", icon: BsCode }
];

const routeToLink = ({ path, icon, title }: typeof routes[number]) => (
  <Link className="navbar-link" to={path} activeClassName="active">
    {icon({})}
    <h4 className="navbar-link-name">{title}</h4>
  </Link>
);

export const Navbar = () => (
  <div className="navbar-container">
    {routes.map(routeToLink)}
    <span className="navbar-link darkmode-toggle" onClick={() => toggleDarkmode()}>
      <CgDarkMode />
    </span>
  </div>
);
