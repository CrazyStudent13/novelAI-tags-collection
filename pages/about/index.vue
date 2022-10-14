<template>
  <div class="about">
    <br />
    <el-timeline>
      <el-timeline-item v-for="(item, index) in timeLine" :key="index" :timestamp="item.time" placement="top">
        <el-card>
          <h4>{{ item.name }}</h4>
          <p>{{ item.content }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  layout: 'common',
  data() {
    return {
      timeLine: [
        {
          time: '2022/10/15',
          name: 'v1.0.0',
          content: `初步搭建了一个tag收集器，目前的数据是从git上某个开源的excel拿的，详情参考项目说明文档，未来会考虑使用后台。下次会加入词条长度限制，并更新tag数据`,
        },
      ],
    }
  },
}
</script>

<style lang="less">
.about {
  width: calc(100% - 32px);
  height: 100%;
  padding: 8px 16px;
  background: white;
}
</style>
