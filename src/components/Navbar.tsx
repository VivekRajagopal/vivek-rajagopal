import { Link } from "gatsby";
import React from "react";
import { CgDarkMode } from "react-icons/cg";

import { toggleDarkmode } from "@/utils/darkmode";

import "./Navbar.scss";

const routes = [
  { path: "/", title: "Intro" },
  { path: "/blog", title: "Blog" },
];

const RouteLink = ({ path, title }: (typeof routes)[number]) => (
  <Link className="navbar-link" to={path} activeClassName="active">
    <span className="navbar-link-name">{title}</span>
  </Link>
);

export const Navbar = () => {
  return (
    <nav className="navbar-container">
      {routes.map((route) => (
        <RouteLink key={route.path} {...route} />
      ))}
      <span className="navbar-link darkmode-toggle" onClick={() => toggleDarkmode()}>
        <CgDarkMode />
      </span>
    </nav>
  );
};
