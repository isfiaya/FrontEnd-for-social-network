module.exports = {
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/css/variables.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? 'Groupomania'
    : '/'
}
