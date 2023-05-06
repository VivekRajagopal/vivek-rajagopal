module.exports = {
  siteMetadata: {
    title: "Vivek Rajagopal",
    siteUrl: "https://vivekrajagopal.dev",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "@": `${__dirname}/src`,
      },
    },
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-gtag",
      options: {
        trackingIds: ["G-7RQ42GPQC7"],
        pluginConfig: {
          head: true,
        },
      },
    },
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        excludes: [`/dev-404-page`, `/404`, `/404.html`, `/offline-plugin-app-shell-fallback`],
        resolvePagePath: (page) => page.path,
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Vivek Rajagopal",
        short_name: "Vivek Rajagopal",
        start_url: "/",
        background_color: "#6622dd",
        theme_color: "#6622dd",
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
