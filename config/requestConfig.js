/**
 * Author: 杨扬
 * Date: 2022-02-21 11:17:41
 * LastEditTime: 2022-02-21 14:38:55
 * desc: 页面通用的请求配置
 */

export default {
  BaseURLVersion: '1', // 通用接口版本
  urlVersion1: 'https://www.ssgkyq.com/portal/', // 对应版本的接口配置
  urlVersion2: 'https://www.fastmock.site/mock/e56760686fddcce38c0e225702f715b8/esm', // 对应版本的接口配置
  isHeaderParams: false, // 是否设置请求头部参数
  isToken: false, // 是否使用token认证
  isSSOEnable: false, // 是否使用统一身份认证
  isLoading: false, // 接口是否在等待期间使用Loading效果
  isEncryption: false, // 是否加密请求参数
  timeOut: 15000, // 接口过期时间配置，如果不配置，默认为10S
}
