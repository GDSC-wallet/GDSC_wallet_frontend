module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '^/oauth': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    }
  }
}
