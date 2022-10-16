<template>
  <div class="pageSider">
    <el-menu :default-active="activeMenu" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
      <el-menu-item v-for="(menu, index) in tagsOptions" :key="index" :index="menu.group_value" @click.native="handleMenuClick(menu)">
        <span slot="title">
          {{ menu.group_name }}
        </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
// 导入数据
import tags from '@/assets/data/tags'
import tags_r18 from '@/assets/data/tags_r18' // 暂时不考虑使用
export default {
  data() {
    return {
      tags,
      activeMenu: '',
    }
  },
  computed: {
    tagsOptions() {
      let optionsTemp = tags.concat(tags_r18)
      return optionsTemp
    },
  },
  methods: {
    handleMenuClick(menu) {
      if (this.$router.path !== '/') {
        this.$router.push({
          path: '/',
        })
        this.$nextTick(() => {
          this.$store.dispatch('app/setMenu', menu)
        })
      } else {
        this.$store.dispatch('app/setMenu', menu)
      }
    },
  },
  created() {
    this.$nextTick(() => {
      this.activeMenu = this.tags[0].group_value
      this.handleMenuClick(this.tags[0])
    })
  },
}
</script>

<style class="less">
.pageSider {
  background: #304156;
}
</style>
