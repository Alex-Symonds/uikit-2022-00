module.exports = {
  "stories": [
    '../components/*.stories.tsx',
    '../components/**/*.stories.tsx',
    '../styles/*.stories.mdx',
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-addon-pseudo-states",
  ],
  "framework": "@storybook/react",
  "core": {
    "builder": "@storybook/builder-webpack5"
  },
  "staticDirs": ['../public'],
}