/*
 * @Author: 远川
 * @Date: 2020-11-26 11:47:16
 * @Last Modified by: 杨扬
 * @Last Modified time: 2020-11-26 14:02:34
 * @desc: 存放的是开发中常用的小工具
 */
import { Message } from 'element-ui'

let tempText = ''
let timeout = null
// let timeout, args, context, timestamp, result

export default {
  // 防抖
  antiShake(fn, t) {
    let delay = t || 500
    let timer
    return function () {
      let args = arguments
      if (timer) {
        clearTimeout(timer)
      }

      let callNow = !timer

      timer = setTimeout(() => {
        timer = null
      }, delay)

      if (callNow) fn.apply(this, args)
    }
  },

  isNullorUndefined(value) {
    if (value === null || typeof value === 'undefined' || value === '' || value.length === 0 || JSON.stringify(value) === '{}') {
      return true
    } else {
      return false
    }
  },

  //浮点数展示取消误差 只可用于数据展示 无法用于浮点数运算--Ben
  floatShow(num, precison = 12) {
    return parseFloat(num.toPrecision(precison))
  },

  uniqueArr: function (arr) {
    return Array.from(new Set(arr))
  },

  // 数组去空工具
  removeArrayNull(arr) {
    let arrHandler = []
    arrHandler = arr.filter((item) => {
      return item !== null
    })
    return arrHandler
  },

  // 数字精度计算,目前仅支持加减法
  computeFormNum(a, b, digit, computeMethod) {
    var m = Math.pow(10, digit)
    switch (computeMethod) {
      case 'add':
        return (a * m + b * m) / m

      case 'sub':
        return (a * m - b * m) / m
    }
  },

  // 防抖
  debounce(fn, wait) {
    console.log(fn, wait)
    const context = this
    const args = arguments
    if (timeout !== null) clearTimeout(timeout)
    const callNow = !timeout
    timeout = setTimeout(fn, wait)
    if (callNow) fn.apply(context, args)
  },

  // 深拷贝
  deepCopy(obj) {
    if (!obj && typeof obj !== 'object') {
      throw new Error('error arguments')
    }
    // const targetObj = obj.constructor === Array ? [] : {};
    const targetObj = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      // 只对对象自有属性进行拷贝
      if (obj.hasOwnProperty(key)) {
        if (obj[key] && typeof obj[key] === 'object') {
          targetObj[key] = this.deepCopy(obj[key])
        } else {
          targetObj[key] = obj[key]
        }
      }
    }
    return targetObj
  },

  // 节流工具
  // judgeValueState(value) {
  // return isNullOrUndefined(value)
  // },

  // 全局数据字典转换工具，转化那些不标准的数组字典
  optionTranslate(label, value, array) {
    const optionsArray = []
    const labelCode = label
    const valueCode = value
    array.map((item) => {
      let tempItem = item
      tempItem.value = parseInt(item[valueCode])
      tempItem.label = item[labelCode]
      optionsArray.push(tempItem)
    })
    return optionsArray
  },

  // 字符串去重
  strDistinct(str, repeatStr, separator) {
    let tempArr = str.split(separator)
    tempArr.map((itemtemp, indextemp, arr) => {
      if (itemtemp === repeatStr) {
        arr.splice(indextemp, 1)
      }
    })
    tempText = tempArr.join(separator)
    return tempText
  },

  // 数组对象去重
  arrObjDistinct(arr, distinctKey) {
    let obj = {}
    let arrTemp = new Array()
    arrTemp = arr.reduce((cur, next) => {
      obj[next[distinctKey]] ? '' : (obj[next[distinctKey]] = true && cur.push(next))
      return cur
    }, []) // 设置cur默认类型为数组，并且初始值为空的数组
    return arrTemp
  },

  // 数组对象查重
  duplicateCheck(arr, distinctKey) {
    let flag = true
    // 数组查重
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) {
        console.log(arr[i][distinctKey], arr[j][distinctKey])
        if (arr[i][distinctKey] !== arr[j][distinctKey]) {
          flag = false
          break
        }
      }
    }
    // 如果有重复项，返回true,反之返回else
    return !flag
  },

  // 全局数据字典翻译工具
  translate(value, array, type) {
    // type代表翻译类型，true代表返回的为key值，flase代表返回label值
    let keyValue = null
    let label = ''
    if (type) {
      array.map((item) => {
        if (item.label === value || item.text === value) keyValue = item.value
      })
      return keyValue
    } else {
      array.map((item) => {
        if (item.value === value) {
          if (item.label !== undefined) {
            label = item.label
          } else {
            label = item.text
          }
        }
      })
      return label
    }
  },

  // 翻译以code为准的数据字典
  translateCode(value, array, type) {
    // type代表类型，true代表返回的为key值，flase代表返回label值
    let keyValue = null
    let label = ''
    if (type) {
      array.map((item) => {
        if (item.label === value || item.text === value) keyValue = item.code
      })
      return keyValue
    } else {
      array.map((item) => {
        if (item.code === value) {
          if (item.label !== undefined) {
            label = item.label
          } else {
            label = item.text
          }
        }
      })
      return label
    }
  },

  // 时间格式化插件
  formatTime(Time, format) {
    let o = {
      'y+': Time.getFullYear(), // 月份
      'M+': Time.getMonth() + 1, // 月份
      'd+': Time.getDate(), // 日
      'h+': Time.getHours(), // 小时
      'm+': Time.getMinutes(), // 分
      's+': Time.getSeconds(), // 秒
      'q+': Math.floor((Time.getMonth() + 3) / 3), // 季度
      S: Time.getMilliseconds(), // 毫秒
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (Time.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (var k in o) if (new RegExp('(' + k + ')').test(format)) format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    return format
  },

  // 日期格式化
  parseTime(time, pattern) {
    if (arguments.length === 0 || !time) {
      return null
    }
    const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
    let date
    if (typeof time === 'object') {
      date = time
    } else {
      if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
        time = parseInt(time)
      } else if (typeof time === 'string') {
        time = time.replace(new RegExp(/-/gm), '/')
      }
      if (typeof time === 'number' && time.toString().length === 10) {
        time = time * 1000
      }
      date = new Date(time)
    }
    const formatObj = {
      y: date.getFullYear(),
      m: date.getMonth() + 1,
      d: date.getDate(),
      h: date.getHours(),
      i: date.getMinutes(),
      s: date.getSeconds(),
      a: date.getDay(),
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
      let value = formatObj[key]
      // Note: getDay() returns 0 on Sunday
      if (key === 'a') {
        return ['日', '一', '二', '三', '四', '五', '六'][value]
      }
      if (result.length > 0 && value < 10) {
        value = '0' + value
      }
      return value || 0
    })
    return time_str
  },

  /**
   * 构造树型结构数据
   * @param {*} data 数据源
   * @param {*} id id字段 默认 'id'
   * @param {*} parentId 父节点字段 默认 'parentId'
   * @param {*} children 孩子节点字段 默认 'children'
   * @param {*} rootId 根Id 默认 0
   */
  handleTree(data, id, parentId, children, rootId) {
    console.log(data, id, parentId, children, rootId)
    id = id || 'id'
    parentId = parentId || 'parentId'
    children = children || 'children'
    rootId =
      rootId ||
      Math.min.apply(
        Math,
        data.map((item) => {
          return item[parentId]
        })
      ) ||
      0
    // 对源数据深度克隆
    const cloneData = JSON.parse(JSON.stringify(data))
    // 循环所有项
    const treeData = cloneData.filter((father) => {
      let branchArr = cloneData.filter((child) => {
        // 返回每一项的子级数组
        return father[id] == child[parentId]
      })
      branchArr.length > 0 ? (father.children = branchArr) : ''
      // 返回第一层
      return father[parentId] == rootId
    })
    return treeData != '' ? treeData : data
  },

  // 表单重置
  resetForm(refName) {
    console.log('表单重置', refName)
    if (this.$refs[refName]) {
      this.$refs[refName].resetFields()
    }
  },

  // 时间戳转换工具
  timestampTranslate(time = +new Date()) {
    var date = new Date(time + 8 * 3600 * 1000) // 因为是北京时区，所以这里增加8小时
    return date.toJSON().substr(0, 19).replace('T', ' ')
  },

  // 日期计算
  /**
   * @param {type} date 时间.
   * @param {type} val 需要增加的天数.
   */
  countDate(date, val) {
    let dateTime = new Date(date)
    dateTime = dateTime.setDate(dateTime.getDate() + val)
    dateTime = new Date(dateTime)
    let Year = dateTime.getFullYear()
    let Mouth = dateTime.getMonth() + 1
    let Day = dateTime.getDate()
    return Year + '-' + Mouth + '-' + Day
  },

  // 判断两个时间是否相等
  compareDate(dateA, dateB) {
    let date1 = new Date(dateA)
    let date2 = new Date(dateB)
    console.log(date1 - date2 == 0, dateB, dateA)
    return date1 - date2 == 0
  },

  /**
   *
   *
   * @param { 操作符，代表} operator
   * @param {*} time
   * @param {*} type
   * @param {*} num
   */
  // countTime(operator, time, type, num) {
  //   //
  //   let DateTemp = new Date(time)
  //   if (time !== null && time !== undefined) {
  //     switch (type) {
  //       case 'year':
  //         return (DateTemp.getFullYear()+num) + '-' + time.substr(5, 5)
  //       case 'mouth':
  //         new Date().setDate(DateTemp.getMonth() - num)
  //         break
  //       case 'day':
  //         return  time.substr(0, 7) + '-' + (DateTemp.getDay() - num)
  //     }
  //   }
  // },

  // 将数组对象中的key转换为大写key, upper 代表转大写，lower代表转小写
  upperOrLowerArrayObjectKeys(array, code) {
    let newArray = []
    array.map((item) => {
      let tempItem = {}
      Object.keys(item).map((itemKey) => {
        let tempKey = ''
        if (code === 'upper') {
          tempKey = itemKey.toUpperCase()
        } else {
          tempKey = itemKey.toLowerCase()
        }

        tempItem[tempKey] = item[itemKey]
      })
      newArray.push(tempItem)
    })
    return newArray
  },

  deepClone(obj) {
    let _obj = JSON.stringify(obj)
    let objClone = JSON.parse(_obj)
    return objClone
  },

  // 地址栏截取工具
  UrlSearch() {
    let name
    let value
    let str = location.href
    let num = str.indexOf('?') // 取得整个地址栏
    str = str.substr(num + 1) // 取得所有参数 stringvar.substr(start [, length ]
    const arr = str.split('&') // 各个参数放到数组里
    console.log(arr)
    for (let i = 0; i < arr.length; i++) {
      num = arr[i].indexOf('=')
      if (num > 0) {
        name = arr[i].substring(0, num)
        value = arr[i].substr(num + 1)
        this[name] = value
      }
    }

    // return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null
  },

  // 地址栏截取工具
  param(json) {
    if (!json) return ''
    return cleanArray(
      Object.keys(json).map((key) => {
        if (json[key] === undefined) return ''
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      })
    ).join('&')
  },

  // 转换为整数
  strToInt(str) {
    return parseInt(str)
  },

  // 压缩图片，前端制作缩略图
  compressImg(img) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    // 瓦片canvas
    const tCanvas = document.createElement('canvas')
    const tctx = tCanvas.getContext('2d')
    const initSize = img.src.length
    let width = img.width
    let height = img.height
    // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
    let ratio
    if ((ratio = (width * height) / 4000000) > 1) {
      console.log('大于400万像素')
      ratio = Math.sqrt(ratio)
      width /= ratio
      height /= ratio
    } else {
      ratio = 1
    }
    canvas.width = width
    canvas.height = height
    // 铺底色
    ctx.fillStyle = '#fff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // 如果图片像素大于100万则使用瓦片绘制
    let count
    if ((count = (width * height) / 1000000) > 1) {
      console.log('超过100W像素')
      count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
      // 计算每块瓦片的宽和高
      const nw = ~~(width / count)
      const nh = ~~(height / count)
      tCanvas.width = nw
      tCanvas.height = nh
      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
          ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
        }
      }
    } else {
      ctx.drawImage(img, 0, 0, width, height)
    }
    // 进行最小压缩
    const ndata = canvas.toDataURL('image/jpeg', 0.1)
    console.log('压缩前：' + initSize)
    console.log('压缩后：' + ndata.length)
    console.log('压缩率：' + ~~((100 * (initSize - ndata.length)) / initSize) + '%')
    tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
    return ndata
  },

  // 图片转换为File格式
  base64ToFile(dataURI, type) {
    let binary = atob(dataURI.split(',')[1])
    let array = []
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i))
    }
    return new Blob([new Uint8Array(array)], { type: type })
  },

  // 图片转换为Base64位码
  getBase64Image(img) {
    var canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)
    var ext = img.src.substring(img.src.lastIndexOf('.') + 1).toLowerCase()
    var dataURL = canvas.toDataURL('image/' + ext)
    return dataURL
  },

  // 判断图片上传的类型
  /**
   *
   *
   * @param {*} file 上传文件的信息
   * @param {*} typeArr  要限制的类型，可能是复数个，'txt', 'pdf', 'doc', 'bmp', 'jpg', 'jpeg', 'png', 'docx', 'xlsx', 'zip', '7z', 'rar'
   * @param {*} size  需要限制的大小
   */
  judgeUploadFile(file, typeArr, size) {
    let FileExt = file.name.replace(/.+\./, '')
    let TypeArrList = typeArr
    let TypeArrStr = ''
    let fileSize = size
    TypeArrList.map((item, index, arr) => {
      TypeArrStr = arr.length - 1 !== index ? TypeArrStr + item + ',' : TypeArrStr + item
    })

    if (TypeArrList.indexOf(FileExt.toLowerCase()) === -1) {
      Message({ message: '您上传的文件格式有误', type: 'warning' })
      return false
    } else {
      this.isLt2k = file.size / 1024 < fileSize ? '1' : '0'
      if (this.isLt2k === '0') {
        Message({ message: `上传文件大小不能超过${fileSize / 1024}M！`, type: 'error' })
      }
      return this.isLt2k === '1' ? true : false
    }
  },

  // 下载excel文件
  downloadExcelFile(blob, fileName) {
    //  对于<a>标签，只有 Firefox 和 Chrome（内核） 支持 download 属性
    //  IE10以上支持blob但是依然不支持download
    if ('download' in document.createElement('a')) {
      // 支持a标签download的浏览器
      const link = document.createElement('a')
      link.download = fileName
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      document.body.appendChild(link)
      link.click()
      URL.revokeObjectURL(link.href)
      document.body.removeChild(link)
    } else {
      // 其他浏览器
      navigator.msSaveBlob(blob, fileName)
    }
  },

  // 判断项目现场,后续会添加判断版本的功能

  // --------------ruoyi方法
  // 添加日期范围

  // 添加日期范围
  addDateRange(params, dateRange, propName) {
    var search = params
    search.params = {}
    if (dateRange != null && dateRange != '') {
      if (typeof propName === 'undefined') {
        search.params['beginTime'] = dateRange[0]
        search.params['endTime'] = dateRange[1]
      } else {
        search.params['begin' + propName] = dateRange[0]
        search.params['end' + propName] = dateRange[1]
      }
    }
    return search
  },

  // 回显数据字典
  selectDictLabel(datas, value) {
    var actions = []
    Object.keys(datas).some((key) => {
      if (datas[key].dictValue == '' + value) {
        actions.push(datas[key].dictLabel)
        return true
      }
    })
    return actions.join('')
  },

  //获取文件后缀名
  getFileType(filePath) {
    var startIndex = filePath.lastIndexOf('.')
    if (startIndex != -1) return filePath.substring(startIndex + 1, filePath.length).toLowerCase()
    else return ''
  },

  plus(a, b) {
    if (typeof a == 'string') {
      a = parseFloat(a)
    }
    if (typeof b == 'string') {
      b = parseFloat(b)
    }
    return parseFloat((a + b).toFixed(2))
  },
  dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  },
  blobToDataURL(blob, callback) {
    var a = new FileReader()
    a.onload = function (e) {
      callback(e.target.result)
    }
    a.readAsDataURL(blob)
  },
}
