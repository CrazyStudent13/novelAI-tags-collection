<template>
  <div class="tags-operate">
    <!-- 顶部标签栏 -->
    <div class="tags-operate-header">
      <el-tag v-for="(tag, index) in multipleSelection" :key="index" closable style="margin: 4px 5px" @close="handleClose(tag)">
        {{ tag.label }}
      </el-tag>
    </div>

    <div class="tags-operate-body">
      <el-table ref="multipleTable" :data="tagsTable" tooltip-effect="dark" style="width: 100%" @select="selectRow" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号" width="55"> </el-table-column>
        <el-table-column label="标签" prop="label">
          <template slot="header">
            <el-input v-model.trim="search" @input="searchData" size="mini" placeholder="输入关键字搜索标签" />
          </template>
        </el-table-column>
        <el-table-column label="原词" prop="value"> </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
      </div>
    </div>

    <bottomBar :height="'160px'">
      <div class="tags-operate-footer">
        <div class="tags-operate-footer-item">
          {{ selectStr }}
        </div>
        <div class="tags-operate-footer-item tags-operate-footer-btn">
          <el-button type="primary" @click="copy(selectStr)">复制</el-button>
          <el-button @click="reset">重置</el-button>
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
      // 当前表格选中的标签
      currentMultipleSelection: [],
      // 当前表格为选中标签
      currentNoSelection: [],
      // 所有表格选中的标签
      multipleSelection: [],
      selectStr: '',
      tagsTable: [],
    }
  },
  computed: {
    menu() {
      return this.$store.getters.menu || []
    },
    // 获取当前选中的标签分组
    tableData() {
      let tableData = this.$devTools.isNullorUndefined(this.$store.getters.menu) ? [] : this.$store.getters.menu.tags
      return tableData
    },
  },
  watch: {
    tableData: {
      handler(val) {
        this.tagsTable = val

        // 根据已选标签，将已经选中的标签渲染出来
        this.$nextTick(() => {
          let selectTempArr = []
          this.multipleSelection.map((row) => {
            this.tableData.map((item) => {
              if (row.value == item.value) selectTempArr.push(item)
            })
          })
          this.toggleSelection(selectTempArr)
        })
      },
      deep: true,
    },
    // 根据当前已选中标签，生成选中的字符串
    currentMultipleSelection: {
      handler(val) {
        this.multipleSelection.push(...val)
        this.multipleSelection = this.$devTools.arrObjDistinct(this.multipleSelection, 'value')

        // // 找出当前表中未选中的字段, 并移除这些未选中的字段
        // this.currentNoSelection = this.$devTools.deepCopy(this.tagsTable) || []

        this.selectStr = ''
        if (!this.$devTools.isNullorUndefined(this.multipleSelection)) {
          this.multipleSelection.map((item, index, arr) => {
            this.selectStr += arr.length - 1 !== index ? `${item.value},` : `${item.value}`
          })
        }
      },
      deep: true,
    },
  },
  methods: {
    // 移除已选标签
    handleClose(tag) {
      // 总标签列表已选移除
      this.multipleSelection.splice(this.multipleSelection.indexOf(tag), 1)

      // 判断当前选中的标签表是否有标签， 移除当前表格已选项
      this.tagsTable.map((item) => {
        if (item.value == tag.value) {
          this.currentMultipleSelection.splice(this.currentMultipleSelection.indexOf(tag), 1)
          this.toggleSelection([tag])
        }
      })
    },

    // 移除选中的字符串
    removeSelectStr(tag) {
      // 分割当前字符串，并移除对应选中的字符串
      let selectStrArr = this.selectStr.split(',')

      selectStrArr.map((item, index, arr) => {
        if (item == tag.value) {
          arr.splice(index, 1)
        }
      })
    },
    handleSelectionChange(val) {
      this.currentMultipleSelection = val || []
      this.currentNoSelection = []
    },
    selectRow(selection, row) {
      // 移除已选的标签的操作，这里的逻辑很混乱，后续优化放到后端去处理
      this.currentMultipleSelection.map((item) => {
        if (item.value == row.value) {
          this.multipleSelection.map((tag, tagIndex, arr) => {
            if (tag.value == row.value) arr.splice(tagIndex, 1)
          })
        }
      })
    },
    // 控制表格的tag是否选中
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },

    // 检索当前列表
    searchData(value) {
      this.tagsTable = this.tableData.filter((data) => !value || data.label.includes(value))
    },
    copy(val) {
      let that = this
      if (!this.$devTools.isNullorUndefined(val)) {
        this.$copyText(val || '').then(function (e) {
          console.log(e.text)
          that.$message({
            message: '复制成功',
            type: 'success',
          })
        })
      } else {
        that.$message({
          message: '您无法复制空值',
          type: 'error',
        })
      }
    },

    reset() {
      this.selectStr = ''
      this.currentMultipleSelection = []
      this.multipleSelection = []
      this.toggleSelection()
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
