<!--
 * @Author: 远川
 * @Date: 2022-02-21 11:17:41
 * @Last Modified by: chenjie2-21 14:40:27
 * @Last Modified time: 2022-10-11 20:22:19
-->
<template>
  <div class="sidebar-logo-container" :style="{ backgroundColor: sideTheme === 'theme-dark' ? variables.menuBgLogo : variables.menuLightBackground }">
    <transition name="sidebarLogoFade">
      <router-link class="sidebar-logo-link" to="/">
        <h1 class="sidebar-title" :style="{ color: sideTheme === 'theme-dark' ? variables.logoTitleColor : variables.logoLightTitleColor }">{{ title }}</h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
import variables from '@/assets/styles/variables.less'

export default {
  name: 'SidebarLogo',
  computed: {
    variables() {
      return variables
    },
    sideTheme() {
      return 'theme-dark'
    },
  },
  data() {
    return {
      title: 'ai绘画咒术咏唱书',
    }
  },
}
</script>

<style lang="less" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9;
  width: 200px;
  height: 60px;
  line-height: 60px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
