<!--
 * @Author: 远川
 * @Date: 2022-02-21 11:17:41
 * @LastEditTime: 2022-02-21 14:45:31
 * @desc: 顶部模板页
-->

<template>
  <div class="navBar" :style="scroll != 0 ? 'background: rgba(255, 255, 255);' : ''">
    <div class="navBar-body">
      <el-row>
        <el-col :span="4">
          <div class="navBar-body-left">
            <slot name="nav-l"></slot>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="navBar-body-right">
            <slot name="nav-r"></slot>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    navHeight: {
      type: [String, Number],
      default: () => {
        return '60px'
      },
    },
    navLeftSpan: {
      type: [String, Number],
      default: 4,
    },
    navRightSpan: {
      type: [String, Number],
      default: 20,
    },
  },

  data() {
    return {
      scroll: 0,
      tabList: [
        { label: '首页', path: '/' },
        {
          title: 'companyOverView',
          label: '公司概况',
          path: '/companyProfile',
          childList: [
            {
              label: '关于高科',
              path: '/companyProfile',
            },
            {
              label: '领导班子',
              path: '/companyProfile/leaderTeam',
            },
            {
              label: '组织框架',
              path: '/companyProfile/organization',
            },
            {
              label: '发展历程',
              path: '/companyProfile/timeLine',
            },
          ],
        },
        {
          label: '下属公司',
          path: '/subCompany',
          childList: [
            {
              label: '蜀新园公司',
              path: '/subCompany',
            },
            {
              label: '蜀泽公司',
              path: '/subCompany/shuze',
            },
            {
              label: '蜀弘公司',
              path: '/subCompany/shuhong',
            },
            {
              label: '蜀城公司',
              path: '/subCompany/shucheng',
            },
            {
              label: '蜀旺公司',
              path: '/subCompany/shuwang',
            },
            {
              label: '蜀峰公司',
              path: '/subCompany/shufeng',
            },
          ],
        },
        {
          label: '新闻中心',
          path: '/newsCenter/news',
          childList: [
            {
              label: '公司要闻',
              path: '/newsCenter/news',
            },
            {
              label: '政府动态',
              path: '/newsCenter/govNews',
            },
            {
              label: '子公司动态',
              path: '/newsCenter/subsidiaryNews',
            },
            {
              label: '企业风采',
              path: '/newsCenter/achievement',
            },
            {
              label: '政策申报',
              path: '/newsCenter/govDeclare',
            },
          ],
        },
        {
          label: '企业党建',
          path: '/government/partyNews',
          childList: [
            {
              label: '党建动态',
              path: '/government/partyNews',
            },
            {
              label: '党史教育',
              path: '/government/history',
            },
            {
              label: '党风廉政',
              path: '/government/supervise',
            },
            {
              label: '群团工作',
              path: '/government/regulation',
            },
          ],
        },
        {
          label: '业务板块',
          path: '/business/assets',
          childList: [
            {
              label: '资产运营',
              path: '/business/assets',
            },
            {
              label: '项目开发',
              path: '/business/estate',
            },
            {
              label: '投融资管理',
              path: '/business/investment',
            },
          ],
        },
        {
          label: '安全生产',
          path: '/safeProduction/safeProduction',
          childList: [
            {
              label: '安全生产',
              path: '/safeProduction/safeProduction',
            },
            {
              label: '学习园地',
              path: '/safeProduction/learnGarden',
            },
          ],
        },
        {
          label: '信息发布',
          path: '/pressReleases/bidding',
          childList: [
            {
              label: '招标公告',
              path: '/pressReleases/bidding',
            },
            {
              label: '人才招聘',
              path: '/pressReleases/recruitment',
            },
            {
              label: '通知公告',
              path: '/pressReleases/notify',
            },
          ],
        },
        {
          label: '联系我们',
          path: '/connect',
          childList: [
            {
              label: '联系方式',
              path: '/connect',
            },
          ],
        },
      ],
      activeIndex: '2',
    }
  },
  mounted() {
    window.addEventListener('scroll', this.getScrollOffset, true) // 监听（绑定）滚轮滚动事件
  },
  methods: {
    getScrollOffset() {
      if (window.pageXOffset) {
        this.scroll = window.pageYOffset
      } else {
        this.scroll = document.body.scrollTop + document.documentElement.scrollTop
      }
    },

    handelTabChange(index, i) {
      let path = ''
      this.active = i
      if (i == null) {
        path = this.tabList[index].path
      } else {
        path = this.tabList[index].childList[i].path
      }
      this.$router.push({
        path,
      })
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath)
    },
  },
}
</script>

<style lang="less" scoped>
.navBar {
  width: 100%;
  background: rgba(255, 255, 255, 0.7);
  position: fixed;
  z-index: 900;
  &::after {
    clear: both;
  }
  &-body {
    width: 1170px;
    margin: 0 auto;

    &-left {
      float: left;
    }

    &-right {
      float: right;
    }
  }
}
</style>
