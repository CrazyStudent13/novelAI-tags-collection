<template>
  <div class="app" style="background: #f5f5f5">
    <div class="app-header">
      <navbar :nav-left-span="4" :nav-right-span="20">
        <template slot="nav-l">
          <!-- <img src="@/assets/img/CATLOGO.png" style="width: 150px; height: 28px; margin-top: 15px" /> -->
        </template>

        <template slot="nav-r">
          <headerMenu></headerMenu>
        </template>
      </navbar>
    </div>

    <div class="app-body">
      <nuxt />
    </div>

    <div class="app-footer">
      <pageFooter></pageFooter>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
