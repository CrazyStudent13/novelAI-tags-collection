<template>
  <!-- 文章展示页面 -->
  <div class="pageArticle">
    <div class="pageArticle-item pageArticle-title" :style="{textAlign: titleAlign}">{{ articleTitle || '暂无文章标题' }}</div>

    <div v-if="!$devTools.isNullorUndefined(articleTagList)" class="pageArticle-item pageArticle-tagList">
      <el-tag v-for="(item, index) in articleTagList" :key="index" size="mini" class="pageArticle-tagList-item">
        {{ item.name }}
      </el-tag>
    </div>

    <div v-if="!$devTools.isNullorUndefined(articleInfoList)" class="pageArticle-item pageArticle-articleInfo">
      <slot name="articleInfo">
        <el-descriptions>
          <el-descriptions-item v-for="(item, index) in articleInfoList" :key="index" :label="item.label">
            {{ item.value }}
          </el-descriptions-item>
        </el-descriptions>
      </slot>
    </div>

    <div v-if="!$devTools.isNullorUndefined(articleText)" class="pageArticle-item pageArticle-text">
      {{ articleText || '暂无文章内容' }}
    </div>
    <div v-else class="pageArticle-item pageArticle-text">
      <el-empty description="暂无文章"></el-empty>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleAlign: {
      type: String,
      default: 'center',
    },
    articleTitle: {
      type: String,
      default: '',
    },
    articleTagList: {
      type: Array,
      default: () => {
        return []
      },
    },
    articleInfoList: {
      type: Array,
      default: () => {
        return []
      },
    },
    articleText: {
      type: String,
      default: '',
    },
  },

  data() {
    return {}
  },

  mounted() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.pageArticle {
  margin: 0 auto;
  min-height: 30vh;
  padding: 15px;
  background: white;
  &-item {
    margin-bottom: 25px;
  }

  &-title {
    font-size: 26px;
    font-weight: bold;
  }

  &-tagList {
    &-item {
      margin-right: 10px;
    }
  }

  &-text {
  }
}
</style>
