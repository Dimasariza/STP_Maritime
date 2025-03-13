module.exports = {
    basePath: '/app',
    output: "export",
    exportPathMap: function () {
      return {
        '/': { page: '/' }
      }
    }
}