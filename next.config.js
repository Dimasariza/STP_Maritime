module.exports = {
    basePath: 'https://github.com/Dimasariza/STP_Maritime',
    output: 'export',
    distDir: 'dist',
    trailingSlash: true,
    exportPathMap: function () {
      return {
        '/': { page: '/' }
      }
    }
}