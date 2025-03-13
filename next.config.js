module.exports = {
    // basePath: '/app',
    output: 'export',
    distDir: 'dist',
    trailingSlash: true,
    exportPathMap: function () {
      return {
        '/': { page: '/' }
      }
    }
}