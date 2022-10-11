<template>
  <commonRow :extendClass="['BG']" height="200px">
    <div class="test">
      <el-button class="btn" type="primary" round>{{ btnText }}</el-button>
    </div>
  </commonRow>
</template>

<script>
import commonRow from '@/components/commonRow'
export default {
  components: { commonRow },
  props: {
    btnText: {
      type: String,
      default: () => {
        return ''
      },
    },
  },
  data() {
    return {}
  },
  computed: {},
  mounted() {},
  methods: {},
}
</script>
<style lang="less" scoped>
.btn {
  font-size: 22px;
  padding: 15px 25px;
  border-radius: 35px;
  background: #086fe7;

  border: none;
  &:hover {
    background: #3587e6;
  }
}
.test {
  width: 138px;
  margin: 0 auto;
  margin-top: 75px;
}
</style>
