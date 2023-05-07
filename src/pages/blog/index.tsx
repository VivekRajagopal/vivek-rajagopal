import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import { BlogArticleCard } from "@/components/BlogArticleCard/BlogArticleCard";
import { Page } from "@/components/Page";

type Blog = {
  date: string;
  path: string;
  title: string;
  description: string;
};

type BlogsQueryResult = {
  published: {
    blogs: { frontmatter: Blog }[];
  };
};

const blogsQuery = graphql`
  {
    published: allMdx(
      filter: { frontmatter: { path: { regex: "/blog/.+/" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      blogs: nodes {
        frontmatter {
          title
          path
          date
          description
        }
      }
    }
  }
`;

const BlogPage = () => {
  const { published } = useStaticQuery<BlogsQueryResult>(blogsQuery);

  return (
    <Page>
      <h1>Vivek Rajagopal</h1>

      <div className="blogs-list">
        {published.blogs.map(({ frontmatter }) => (
          <BlogArticleCard
            key={frontmatter.path}
            className="blog-item"
            title={frontmatter.title}
            datePublished={new Date(frontmatter.date)}
            description={frontmatter.description}
            path={frontmatter.path}
          />
        ))}
      </div>
    </Page>
  );
};

export default BlogPage;
