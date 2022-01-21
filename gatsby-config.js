module.exports = {
    siteMetadata: {
      title: `Gatsby Strapi`,
        siteUrl: `https://www.yourdomain.tld`,
    },
    plugins: [
      {
        resolve: `gatsby-source-strapi`,
        options: {
          apiURL: `http://localhost:1337/api`,
          queryLimit: 1000, // Defaults to 100
          collectionTypes: [`message`],
        },
      },
      {
        resolve: "gatsby-source-graphql",
        options: {
            // Arbitrary name for the remote schema Query type
            typeName: "STRAPI",
            // Field for remote schema. You'll use this in your Gatsby query
            fieldName: "strapi",
            url: `http://localhost:1337/graphql`,
        },
      },
    ]
}