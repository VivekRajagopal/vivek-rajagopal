import { Link } from "gatsby";
import React from "react";
import { IoMdArrowBack } from "react-icons/io";

import "./BlogTitle.scss";

type BlogTitleProps = {
  title: string;
  datePublished: string;
};

export const BlogTitle = ({ title, datePublished }: BlogTitleProps) => (
  <div className="blog-title">
    <Link className="link-back" to="/blog">
      <IoMdArrowBack /> <span>Back</span>
    </Link>
    <h1>{title}</h1>
    <small className="muted">{new Date(Date.parse(datePublished)).toDateString()}</small>
  </div>
);
