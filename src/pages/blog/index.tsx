import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";
import { Page } from "../../components/Page";

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

const BlogEntry = (blog: Blog) => (
  <tr>
    <td
      style={{
        verticalAlign: "top"
      }}
    >
      <small>{new Date(blog.date).toLocaleDateString()}</small>
    </td>
    <td
      style={{
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Link to={blog.path}>
        <h4 style={{ marginTop: 0, marginBottom: "0.5rem" }}>{blog.title}</h4>
      </Link>
      <small>{blog.description}</small>
    </td>
  </tr>
);

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
      <table>
        <thead></thead>
        <tbody>{blog.posts.map(({ frontmatter }) => BlogEntry(frontmatter))}</tbody>
      </table>
    </Page>
  );
};

export default BlogPage;
