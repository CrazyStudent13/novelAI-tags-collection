<!--
 * @Author: 远川
 * @Date: 2022-02-21 11:17:41
 * @Last Modified by: chenjie2-21 14:40:27
 * @Last Modified time: 2022-10-11 20:22:19
-->

<template>
  <div class="logo">
    <div class="logo-body">
      <div class="logo-body-left">
        <slot name="logoL">
          <!-- <img src="@/assets/img/CATLOGO.png" /> -->
        </slot>
      </div>
      <div class="logo-body-right">
        <slot name="logoR"> </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.logo {
  padding: 15px auto;
  &-body {
    width: 1170px;

    margin: 0 auto;

    &-left {
    }

    &-right {
    }
  }
}
</style>
