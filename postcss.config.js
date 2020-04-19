/* eslint-disable */
module.exports = {
  plugins: [
    "tailwindcss",
    ...(process.env.NODE_ENV === `production`
      ? [
          [
            "@fullhuman/postcss-purgecss",
            {
              content: [
                "./pages/**/*.tsx",
                "./pages/**/*.jsx",
                "./components/**/*.tsx",
                "./components/**/*.jsx",
              ],
              defaultExtractor: (content) =>
                content.match(/[A-Za-z0-9-_:/]+/g) || [],
            },
          ],
          "autoprefixer",
          "cssnano"
        ]
      : []),
  ],
};