<template>
  <div>
    <component :is="componentsId" />
  </div>
</template>

<script>
import pageError401 from '@/components/layouts/pageError/401.vue'
import pageError404 from '@/components/layouts/pageError/404.vue'
// import pageError500 from "@/components/layouts/pageError/500.vue"

export default {
  components: {
    pageError401,
    pageError404,
  },
  props: ['error'],
  data() {
    return {
      componentsId: 'pageError404',
    }
  },

  watch: {
    error: {
      handler(val, oldVal) {
        switch (val.statusCode) {
          case '404':
            this.componentsId = 'pageError401'
            break

          case '401':
            break

          case '500':
            break
        }
      },
    },
  },

  methods: {},
}
</script>

<style lang="less" scoped></style>
