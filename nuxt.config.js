export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ai绘画咒术咏唱书',
    htmlAttrs: {
      lang: 'zh',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '整合目前使用的novelAI-tags的标签' },
      { name: 'keywords', content: 'novelai | tags |novelAI|novelAI标签| AI绘图' },
      { name: 'generator', content: 'MetInfo 7.2.0', dataVariable: '|cn|cn|mui387|10001|10001|0' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' },
      // { rel: 'stylesheet', href: '//at.alicdn.com/t/font_3202885_9p4m8dagmyh.css' },
    ],
    // script: [
    //   {
    //     src: '//at.alicdn.com/t/font_3202885_9p4m8dagmyh.js',
    //   },
    // ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['element-ui/lib/theme-chalk/index.css', '@/assets/styles/index.less', '@/assets/styles/element-ui.less', '@/assets/styles/element-ui.less'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '@/plugins/element-ui',
      ssr: true,
    },
    {
      src: '@/plugins/main',
      ssr: true,
    },
    {
      src: '@/plugins/permission',
      ssr: true,
    },
  ],
  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/axios', '@nuxt/content'],

  proxy: {
    '/api/': {
      target: 'https://www.ssgkyq.com/portal', // 这个网站是开源的可以请求到数据的
      pathRewrite: {
        '^/api/': '/',
        changeOrigin: true,
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    extend(config, { isDev }) {
      if (!isDev) {
        config.output.publicPath = './dist/'
      }
    },
  },
  router: {
    mode: 'hash',
    base: process.env.NODE_ENV === 'production' ? '/dist' : '/',
    routeNameSplitter: '/',
    extendRoutes(routes, resolve) {
      // 路由筛选，将components文件的路由去除，防止出意外
      let filterArr = []
      routes.map((item, index, arr) => {
        if (!item.path.includes('components')) filterArr.push(item)
      })
      routes.splice(0)

      // 插入新的路由配置
      filterArr.map((item) => {
        routes.push(item)
      })
    },
  },
  ssr: true,
  generate: {
    dir: 'dist',
    concurrency: 10,
    interval: 100,
    crawler: false,
  },
  hooks: {
    'content:file:beforeInsert': (document) => {
      // 注册插件
      const removeMd = require('remove-markdown')
      if (document.extension === '.md') {
        // 删除Markdown格式的文本
        document.bodyPlainText = removeMd(document.text)
        // 合并title和删除Markdown格式的文本bodyPlainText
        document.bodyPlainTextAndTitle = `${document.title}\n${document.bodyPlainText}`
      }
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('md')
      .test(/.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true,
        preventExtract: true,
        use: [containers], //引进来了
        preprocess: (MarkdownIt, source) => {
          MarkdownIt.renderer.rules.table_open = () => {
            return '<table class="table">'
          }
          MarkdownIt.renderer.rules.fence = wrap(MarkdownIt.renderer.rules.fence)
          return source
        },
      })
  },
}
