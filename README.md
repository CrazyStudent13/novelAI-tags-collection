## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```



## 说明

该项目的制作，一方面是为了自己熟悉 Nuxt 搭建的模板，另一方面也是便于朋友使用 novelAI 的 tag 来测试。

为了避免麻烦，不会开放一些特殊内容。

后期可能考虑会考虑使用后端来管理，不过目前暂时先不考虑这些



## 参考

以下为数据来源的参考，如果有更好的数据来源，还请斧正。

[zcyzcy88/TagTable](https://github.com/zcyzcy88/TagTable)





## 目录

```
enterprise-service-platform-ui
├─.nuxt
├─.editorconfig     // 格式化规则（后续可能考虑清除）
├─.eslintignore     // eslint忽略规则
├─.eslintrc         // eslint检测规则
├─.gitignore        // git提交忽略规则
├─.prettierrc       // Prettier - Code formatter检测规则
├─nuxt.config.js    // nuxt项目的基础配置
├─package-lock.json // node安装包版本锁
├─package.json      // node 安装包版本范围
├─README.md         // 说明文档
├─api               // api文件
├─assets
│  ├─401_images
│  ├─404_images
│  ├─img
│  └─styles
├─components        // 全局组件
│  ├─layouts        // 页面常用的模板
│  │  ├─pageError   // -- 错误模板
│  │  ├─pageFooter  // -- 底部模板
│  │  └─pageHeader  // -- 顶部模板
│  └─page           // 页面常用的模板
│     ├─pageArticle // --文章页面
│     ├─pageList    // --列表页面
│     ├─pageSider   // --侧边栏页面
│     └─pageSider   // --侧边栏页面
├─config            // 全局的JS配置文件
├─layouts           // 模板页
├─middleware        // 中间件
├─node_modules      // 引入的包
├─pages             // 页面
│  └─companyProfile
├─plugins           // 引入插件
├─static            // 常态文件
├─store             //  VUEx全局变量管理
└─utils             // JS工具类文件

```
