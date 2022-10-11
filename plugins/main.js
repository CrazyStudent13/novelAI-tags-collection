/**
 * Author: 杨扬
 * Date: 2022-02-21 11:19:24
 * LastEditTime: 2022-02-21 14:48:32
 * desc: 全局JS文件入口，主要用来引入各类组件和小工具类
 */

import Vue from 'vue'

// 引入devTools,timeTools开发小方法
import { catTools } from 'cat-tools'
import timeTools from '@/utils/timeTools'
Vue.prototype.$devTools = catTools
Vue.prototype.$timeTools = timeTools

// 整体布局组件
import logoBar from '@/components/layouts/pageHeader/logoBar.vue'
import navbar from '@/components/layouts/pageHeader/navbar.vue'
import headerMenu from '@/components/layouts/pageHeader/headerMenu.vue'
import pageFooter from '@/components/layouts/pageFooter/index.vue'


// logo工具栏
Vue.component('logoBar', logoBar)

// 导航栏
Vue.component('navbar', navbar)

// 头部菜单
Vue.component('headerMenu', headerMenu)

// 页脚
Vue.component('pageFooter', pageFooter)

// 页面中需要使用的公共组件
import pageList from '@/components/page/pageList.vue'
import pageSider from '@/components/page/pageSider.vue'
import pageArticle from '@/components/page/pageArticle.vue'

// 列表
Vue.component('pageList', pageList)
// 页面详情所需的小侧边栏
Vue.component('pageSider', pageSider)
// 文章详情
Vue.component('pageArticle', pageArticle)

// 引入路由导航配置
import './permission.js'
