import { Link } from "gatsby";
import React from "react";

import "./BlogArticleCard.scss";

type BlogArticleCardProps = {
  className?: string;
  datePublished: Date;
  title: string;
  description: string;
  path: string;
};

export const BlogArticleCard = ({
  className,
  datePublished,
  description,
  title,
  path,
}: BlogArticleCardProps) => (
  <div className={className}>
    <Link to={path} className="blog-article-card-container">
      <div className="blog-article-card">
        <h3 className="title clear-margins">{title}</h3>
        <small className="muted">{datePublished.toDateString()}</small>
        <p>{description}</p>
      </div>
    </Link>
  </div>
);
