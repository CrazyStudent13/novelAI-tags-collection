<template>
  <div class="tags-operate">
    <!-- 顶部标签栏(暂时先不放出来，目前这种BUG仅仅靠着前端不好处理) -->
    <!-- <div v-if="!$devTools.isNullorUndefined(multipleSelection)" class="tags-operate-header">
      <el-tag v-for="(tag, index) in multipleSelection" :key="index" closable style="margin: 4px 5px" @close="handleClose(tag)">
        <span>{{ tag.label }}</span>
        <span v-if="tag.weight !== 0" style="color: black">{{ tag.weight }} </span>
      </el-tag>
    </div>

    <div v-else class="tags-operate-header" style="color: #cccccc">请点击选中对应的标签</div> -->

    <div class="tags-operate-body">
      <div style="margin: 8px 16px; margin-left: 0; margin-top: 0">
        <el-button size="mini" @click="toggleSelection()">取消选择</el-button>
      </div>
      <el-table ref="multipleTable" :data="tagsTable" tooltip-effect="dark" size="mini" style="width: 100%" @select="selectRow" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column type="index" label="序号" width="55"> </el-table-column>
        <el-table-column label="标签" prop="label">
          <template slot="header">
            <el-input v-model.trim="search" @input="searchData" size="mini" placeholder="输入关键字筛选标签" />
          </template>
        </el-table-column>
        <el-table-column label="原词" prop="value"> </el-table-column>
        <el-table-column label="权重" align="center">
          <template slot-scope="scope">
            <el-input-number v-model.trim="scope.row.weight" size="mini" :max="10"></el-input-number>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-document-copy" size="mini" style="text-align: right" @click="copy(scope.row.value)">复制</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <bottomBar :height="'160px'">
      <div class="tags-operate-footer">
        <div class="tags-operate-footer-item">
          <span v-if="!$devTools.isNullorUndefined(selectStr)">{{ selectStr }}</span>
          <span v-else style="color: #cccccc">词条长度尽量不超出75位</span>
        </div>
        <div class="tags-operate-footer-item tags-operate-footer-btn">
          <el-button type="primary" icon="el-icon-document-copy" @click="copy(selectStr)">复制</el-button>
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
      let tableDataTemp = this.$devTools.deepCopy(tableData)

      return tableDataTemp
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
              if (row.value == item.value) {
                item.weight = row.weight
                selectTempArr.push(item)
              }
            })
          })
          this.changeWeight()
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

        this.changeWeight()
      },
      deep: true,
    },
  },
  mounted() {
    this.tagsTable = this.tableData
  },
  methods: {
    // 修改权重
    changeWeight() {
      this.selectStr = ''
      if (!this.$devTools.isNullorUndefined(this.multipleSelection)) {
        this.multipleSelection.map((item, index, arr) => {
          let currentStr = `${item.value}`
          for (let i = 0; i < item.weight; i++) {
            currentStr = '{' + currentStr
            currentStr = currentStr + '}'
          }
          this.selectStr += arr.length - 1 !== index ? `${currentStr},` : `${currentStr}`
        })
      }
    },
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
    border-bottom: 1px solid #cccc;
    position: sticky;
    top: 0;
    z-index: 999;
    width: 100%;
    min-height: 60px;
    line-height: 60px;
    background: white;
    padding: 0px 16px;
    padding-top: 0px;
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
