module.exports = {
  devServer: {
    port: process.env.VUE_APP_PORT || 8080,
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
