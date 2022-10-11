<!--
 * @Author: 远川
 * @Date: 2022-02-21 11:17:41
 * @LastEditTime: 2022-03-03 10:19:59
 * @desc: 模板页的菜单
-->

<template>
  <div>
    <!-- <div class="businessContact unSelect">商务联系</div>
    <el-menu
      class="unSelect"
      :default-active="activeIndex"
      mode="horizontal"
      :background-color="'rgba(255, 255, 255, 0)'"
      :text-color="'#666'"
      :active-text-color="'#0568E4'"
      size="mini"
      style="float: right"
    >
      <el-menu-item v-for="(item, index) in tabList" :index="item.path" :key="index" @click="handleSelect(item.path)">
        {{ item.label }}
      </el-menu-item>
    </el-menu> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: this.$route.path,
      tabList: [{ label: '首页', path: '/' }],
    }
  },
  methods: {
    handleSelect(path) {
      this.$router.push({
        path: path,
      })
    },
  },
  mounted() {
    console.log(this.$route.path)
  },
}
</script>

<style lang="less" scoped>
.businessContact {
  background: linear-gradient(270deg, #fff2e1 0%, #f1d9b9 100%);
  border-radius: 16px;
  float: right;
  margin-top: 16px;
  margin-left: 10px;
  padding: 4px 12px;
  font-size: 14px;
  color: #814418;
  &:hover {
    cursor: pointer;
  }
}
.el-menu.el-menu--horizontal {
  border-bottom: none;
}
</style>
