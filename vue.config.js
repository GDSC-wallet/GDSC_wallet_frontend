module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    port: "3000",
    proxy: {
      '^/api': {
        target: 'https://wallet.ebg.tw',
        changeOrigin: true
      },
      '^/oauth': {
        target: 'https://wallet.ebg.tw',
        changeOrigin: true
      },
    }
  }
}
