/**
 * Author: 杨扬
 * Date: 2022-02-21 11:19:24
 * LastEditTime: 2022-02-21 14:29:55
 * desc: 时间相关的格式化组件
 */

import moment from 'moment'

export default {
  /**
   * 基于moment.js 实现的倒计时计算
   * @param endTime {String,Date} - 倒计时结束时间
   * @param maxUnit {String} - [maxUnit = "year"] 最大单位
   * @param startTime {String,Date} - 倒计时开始时间，默认为当前时刻
   * @return {Object}  - 计算完成后返回的年月日时分秒数值
   */
  
  countDownTime(endTime, maxUnit = 'year', startTime) {
    let aUnitArr = ['year', 'month', 'day', 'hour', 'minute', 'second']
    let iMaxIndex = aUnitArr.indexOf(maxUnit)
    let end = moment(endTime)
    let start = moment(startTime)
    let result = {}
    if (start - end > 0) {
      throw new Error('开始时间不能晚于结束时间')
    }
    // 过滤掉大于最大单位的单位
    aUnitArr = aUnitArr.filter((item, index) => index >= iMaxIndex)
    result[maxUnit] = end.diff(start, maxUnit)
    if (aUnitArr.length > 1) {
      aUnitArr.reduce((previous, current) => {
        // 结束时间不断减去高位单位时间
        end = end.subtract(result[previous], previous)
        result[current] = end.diff(start, current)
        return current
      })
    }
    return result
  }
}
