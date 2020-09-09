module.exports = {
  purge: process.env.NODE_ENV === 'production'
    ? ['./src/**/*.html', './src/**/*.ts']
    : [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
