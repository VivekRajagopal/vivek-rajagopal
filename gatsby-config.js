module.exports = {
  siteMetadata: {
    title: "Vivek Rajagopal",
    siteUrl: "https://vivekrajagopal.dev"
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "G-7RQ42GPQC7"
      }
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        exclude: [`/dev-404-page`, `/404`, `/404.html`, `/offline-plugin-app-shell-fallback`],
        resolvePagePath: (page) => page.path
      }
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png"
      }
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/"
      },
      __key: "pages"
    }
  ]
};
