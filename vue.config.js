const path = require('path')
const IS_PROD = process.env.NODE_ENV === 'production'

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    app: {
      title: 'vue-cli-electron-template',
      entry: 'src/renderer/index.js',
      template: 'public/index.html',
      filename: 'index.html'
    }
  },
  publicPath: './',
  assetsDir: 'assets',
  outputDir: 'dist',
  productionSourceMap: !IS_PROD,
  devServer: {
    // can be overwritten by process.env.HOST
    host: 'localhost',
    port: 8099
  },
  chainWebpack: config => {
    /* 路径别名，如用`@`指代`src”`等
    Path alias, such as "@" for "src", etc. */
    config.resolve.alias
      .set('@', resolve('src'))
      .set('src', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('plugins', resolve('src/plugins'))
      .set('svg', resolve('src/assets/svg'))
      .set('locales', resolve('src/locales'))
      .set('backend', resolve('src/backend'))
      .set('renderer', resolve('src/renderer'))
      .set('main', resolve('src/main'))
      .set('views', resolve('src/renderer/views'))
      .set('components', resolve('src/renderer/components'))
    // svg config
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: 'src/main/index.js',
      mainProcessWatch: ['src/main'],
      nodeIntegration: true,
      builderOptions: {
        win: {
          icon: './public/app.ico'
        },
        mac: {
          icon: './public/app.png'
        },
        productName: 'vue-cli-electron-template'
      }
    },
    // i18n config
    i18n: {
      locale: 'zh',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
