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
      { hid: 'description', name: 'description', content: '整合目前使用的ai绘图标签' },
      { name: 'keywords', content: 'novelai|tags|novelAI|novelAI标签|AI绘图' },
      { name: 'generator', content: 'MetInfo 7.2.0', dataVariable: '|cn|cn|mui387|10001|10001|0' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' },
      { rel: 'stylesheet', href: 'http://at.alicdn.com/t/font_3202885_9p4m8dagmyh.css' },
    ],
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
  modules: ['@nuxtjs/axios'],

  // proxy: {
  //   '/api/': {
  //     target: 'https://www.ssgkyq.com/portal', // 这个网站是开源的可以请求到数据的
  //     pathRewrite: {
  //       '^/api/': '/',
  //       changeOrigin: true,
  //     },
  //   },
  // },
  target: 'static',
  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    extend(config, { isDev }) {
      if (!isDev) {
        config.output.publicPath = './static/'
      }
    },
  },
  router: {
    mode: 'hash',
    // base: process.env.NODE_ENV === 'production' ? '/dist' : '/',
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
  generate: {
    dir: 'dist',
    concurrency: 10,
    interval: 100,
    crawler: false,
  },
}
