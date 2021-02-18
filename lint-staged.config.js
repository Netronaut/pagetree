// lint-staged.config.js
module.exports = {
  '*.{ts,tsx,js,jsx,json}': ['yarn lint'],
  '*.ts?(x)': () => 'yarn types',
};
