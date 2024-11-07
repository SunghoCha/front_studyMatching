module.exports = {
  devServer: {
    port: 8082 // 원하는 포트 번호로 설정
  },
  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  }
};
