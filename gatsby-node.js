const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const messagesQuery = await graphql(`
    query getData {
      strapi {
          messages {
            data {
                id
                attributes {
                    locale
                    greeting
                    localizations {
                        data {
                            id
                            attributes {
                                locale
                                greeting
                            }
                        }
                    }
                }
            }
          }
        }
      }
    }
  `);

  // Template to create dynamic pages from.
  const messagesTemplate = path.resolve(`src/pages/messages.js`);

  messagesQuery.data.strapi.messages.forEach(
    ({ id, attributes, greeting, localizations, locale }) =>
    {
        if (localizations.length > 0) {
            localizations.forEach((data) => {
                data.locale
                    return createPage({
                        path: `message/${id}/${data.locale.toLowerCase()}`,
                        component: messagesTemplate,
                        context: { 
                        id, attributes, greeting, locale : data.locale, 
                        localizations 
                      },
                    })
            })
        }

        return createPage({
            path: `message/${id}/${locale}`,
            component: messagesTemplate,
            context: { id, attributes, greeting, locale, localizations }
        })
    }
  );
};