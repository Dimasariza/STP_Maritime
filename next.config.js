module.exports = {
    basePath: '/app',
    output: 'export',
    exportTrailingSlash: true,
    exportPathMap: function () {
      return {
        '/': { page: '/' }
      }
    }
}