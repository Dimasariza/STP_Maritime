module.exports = {
    basePath: '/app',
    output: 'export',
    distDir: 'dist',
    exportTrailingSlash: true,
    exportPathMap: function () {
      return {
        '/': { page: '/' }
      }
    }
}