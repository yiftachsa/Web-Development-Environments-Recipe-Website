module.exports = {
  configureWebpack: {
    devtool: "source-map",
  },

  devServer: {
    //proxy: "http://localhost:3000",
    // proxy: {
    //   "/V1": {
    //     target: "http://localhost:3000",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/V1": "",
    //     },
    //   },
    //   "/V2": {
    //     target: "https://assignment-3-2-merav-yiftach.herokuapp.com",
    //     changeOrigin: true,
    //     pathRewrite: {
    //       "^/V2": "",
    //     },
    //   },
    // },
    // // proxy: {
    // '/api': {
    //   target: 'https://assignment-3-2-merav-yiftach.herokuapp.com',
    //   pathRewrite: { '^/api': '' },
    //   ws: true,
    //   changeOrigin: true
    // }
    // },

    host: "0.0.0.0",
  },
  // publicPath: process.env.NODE_ENV === "production" ? "/LAB12/" : "/"
};
