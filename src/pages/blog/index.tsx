import { BlogArticleCard } from "../../components/BlogArticleCard/BlogArticleCard";
import { Page } from "../../components/Page";
import { graphql, useStaticQuery } from "gatsby";
import React from "react";

type Blog = {
  date: string;
  path: string;
  title: string;
  description: string;
  isArchived?: boolean;
};

type BlogsQueryResult = {
  published: {
    blogs: { frontmatter: Blog }[];
  };
  archived: {
    blogs: { frontmatter: Blog }[];
  };
};

const blogsQuery = graphql`
  {
    published: allMdx(
      filter: { frontmatter: { path: { regex: "/blog/.+/" }, isArchived: { ne: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      blogs: nodes {
        frontmatter {
          title
          path
          date
          description
          isArchived
        }
      }
    }
    archived: allMdx(
      filter: { frontmatter: { path: { regex: "/blog/.+/" }, isArchived: { eq: true } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      blogs: nodes {
        frontmatter {
          title
          path
          date
          description
          isArchived
        }
      }
    }
  }
`;

const BlogPage = () => {
  const { published, archived } = useStaticQuery<BlogsQueryResult>(blogsQuery);

  return (
    <Page>
      <h1>Vivek Rajagopal</h1>

      <div className="blogs-list">
        {published.blogs.map(({ frontmatter }) => (
          <BlogArticleCard
            className="blog-item"
            title={frontmatter.title}
            datePublished={new Date(frontmatter.date)}
            description={frontmatter.description}
            path={frontmatter.path}
          />
        ))}
      </div>
      {archived.blogs.length > 0 && (
        <div className="archived-posts-section">
          <h3>Cold Storage 🥶</h3>
          <p>
            These are articles that are quite old and likely reference apps that no longer work. I've kept them around
            for historical purposes.
          </p>
          <div className="blogs-list">
            {archived.blogs.map(({ frontmatter }) => (
              <BlogArticleCard
                className="blog-item"
                title={frontmatter.title}
                datePublished={new Date(frontmatter.date)}
                description={frontmatter.description}
                path={frontmatter.path}
              />
            ))}
          </div>
        </div>
      )}
    </Page>
  );
};

export default BlogPage;
