import React from "react";
import { BsPersonFill, BsLaptop, BsCode } from "react-icons/bs";
import { Link } from "gatsby";

import "./Navbar.scss";

// const style: React.CSSProperties = {
//   color: "white",
//   flexShrink: 0,
//   display: "flex",
//   flexDirection: "row",
//   justifyItems: "center",
//   justifyContent: "space-around",
//   width: "100%",
//   position: "sticky",
//   top: "0",
//   backgroundColor: "white"
// };

const routes = [
  { path: "/", title: "Intro", cIcon: BsPersonFill },
  { path: "/work", title: "Work", cIcon: BsPersonFill },
  { path: "/blog", title: "Blog", cIcon: BsPersonFill }
];

export const Navbar = () => (
  <div className="navbar-container">
    <Link className="navbar-link" to={"/"} activeClassName="active">
      <BsPersonFill />
      <h4 className="navbar-link-name">Intro</h4>
    </Link>
    <Link className="navbar-link" to={"/work"} activeClassName="active" partiallyActive={true}>
      <BsLaptop />
      <h4 className="navbar-link-name">Work</h4>
    </Link>
    <Link className="navbar-link" to={"/blog"} activeClassName="active" partiallyActive={true}>
      <BsCode />
      <h4 className="navbar-link-name">Blog</h4>
    </Link>
  </div>
);
