<template>
  <el-container style="background: #f5f5f5; padding: 0; height: 100vh">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background: #304156">
      <logoBar />
      <pageMenuA />
    </el-aside>

    <el-main class="app" style="padding: 0">
      <!-- 顶部导航栏 -->
      <div class="app-header">
        <headerMenu />
        <navbar />
      </div>

      <!-- 主体内容 -->
      <div class="app-body">
        <nuxt :key="key" />
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      currentMenu: [],
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
  },
}
</script>
