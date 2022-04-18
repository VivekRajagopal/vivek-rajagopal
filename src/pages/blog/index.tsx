import { BlogArticleCard } from "../../components/BlogArticleCard/BlogArticleCard";
import { Page } from "../../components/Page";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

type Blog = {
  date: string;
  path: string;
  title: string;
  description: string;
};

type PageQueryResult = {
  blog: {
    posts: { frontmatter: Blog }[];
  };
};

const pageQuery = graphql`
  query BlogsQuery {
    blog: allMdx(
      filter: { frontmatter: { path: { regex: "/blog/.+/" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      posts: nodes {
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
  const { blog } = useStaticQuery<PageQueryResult>(pageQuery);

  return (
    <Page>
      <h1>Vivek Rajagopal</h1>

      <div className="blogs-list">
        {blog.posts.map(({ frontmatter }) => (
          <BlogArticleCard
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
