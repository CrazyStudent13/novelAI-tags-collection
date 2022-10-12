<template>
  <div class="tags-operate">
    <!-- 顶部标签栏 -->
    <div class="tags-operate-header">
      <el-tag v-for="(tag, index) in multipleSelection" :key="index" style="margin: 4px 5px">
        {{ tag.label }}
      </el-tag>
    </div>

    <div class="tags-operate-body">
      <el-table ref="multipleTable" :data="tagsTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="标签" prop="label">
          <template slot="header">
            <el-input v-model.trim="search" @input="searchData" size="mini" placeholder="输入关键字搜索标签" />
          </template>
        </el-table-column>
        <el-table-column label="原词" prop="value"> </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection([tagsTable[1], tagsTable[2]])">切换第二、第三行的选中状态</el-button>
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>

    <bottomBar :height="'160px'">
      <div class="tags-operate-footer">
        <div class="tags-operate-footer-item">
          {{ selectStr }}
        </div>
        <div class="tags-operate-footer-item tags-operate-footer-btn">
          <el-button type="primary">复制</el-button>
          <el-button>重置</el-button>
        </div>
      </div>
    </bottomBar>
  </div>
</template>

<script>
export default {
  layout: 'common',
  data() {
    return {
      search: '',
      multipleSelection: [],
      selectStr: '',
      tagsTable: [],
    }
  },
  computed: {
    menu() {
      return this.$store.getters.menu || []
    },
    tableData() {
      let tableData = this.$devTools.isNullorUndefined(this.$store.getters.menu) ? [] : this.$store.getters.menu.tags
      return tableData
    },
  },
  watch: {
    tableData: {
      handler(val) {
        this.tagsTable = val
      },
      deep: true,
    },
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    searchData(value) {
      this.tagsTable = this.tableData.filter((data) => !value || data.label.includes(value))
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.multipleSelection.map((item) => {
        this.selectStr += item.value + ','
      })
    },
  },
}
</script>

<style lang="less">
.tags-operate {
  &-header {
    width: 100%;
    min-height: 64px;
    line-height: 64px;
    background: white;
    padding: 8px 16px;
    margin-bottom: 16px;
  }

  &-body {
    padding: 8px 16px;
    margin-bottom: 160px;
  }

  &-footer {
    padding: 8px 16px;

    &-item {
      width: 100%;
      padding: 8px 0;
    }

    &-btn {
      position: absolute;
      bottom: 8px;
      margin-right: 16px;
      width: calc(100% - 240px);
      text-align: right;
    }
  }
}
</style>
