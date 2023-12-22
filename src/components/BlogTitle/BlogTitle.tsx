import React from "react";

import "./BlogTitle.scss";

type BlogTitleProps = {
  title: string;
  datePublished: string;
};

export const BlogTitle = ({ title, datePublished }: BlogTitleProps) => (
  <div className="blog-title">
    <h1>{title}</h1>
    <small className="muted">{new Date(Date.parse(datePublished)).toDateString()}</small>
  </div>
);
