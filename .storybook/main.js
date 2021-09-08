module.exports = {
  stories: [
    '../packages/components/src/**/*.stories.mdx',
    '../packages/components/src/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials'
  ],
};
