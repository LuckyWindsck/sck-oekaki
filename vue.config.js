module.exports = {
  devServer: {
    hot: false,
    open: true,
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sck-oekaki/'
    : '/',
};
