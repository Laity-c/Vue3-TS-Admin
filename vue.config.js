// const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
// import AutoImport from 'unplugin-auto-import/webpack'
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  outputDir: './build',
  // publicPath: './'添加上这个就能把我们打包后的文件都加上一个./
  //如果是后面部署到服务器上就不需要这个了,可以注释掉
  // publicPath: './',
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://152.136.185.210:5000',
        pathRewrite: { '^/api': '' },
        pchangeOrigin: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        views: '@/views'
      }
    },
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
  // configureWebpack: (config) => {
  //   config.resolve.alias = {
  //     '@': path.resolve(__dirname, 'src'),
  //     components: '@/components'
  //   }
  // }
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set('@', path.resolve(__dirname, 'src'))
  //     .set('components', '@/components')
  // }
}
