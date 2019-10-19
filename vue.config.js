module.exports = {
  devServer: {
    port: 8080, // 端口号
    // proxy: {
    //   '/apis': {
    //     target: 'http://47.110.160.217:9071/',
    //     ws: true,
    //     changOrigin: true,
    //     pathRewrite: {
    //       '^/apis': '/apis'
    //     }
    //   }
    // }
  }
};
