/**
 * Author: 远川
 * Date: 2022-02-21 11:19:24
 * LastEditTime: 2022-02-21 14:53:00
 * desc: axios接口拦截及配置
 */

import axios from 'axios'
import { getToken } from '@/utils/auth'
import errorCode from '@/config/errorCode'
import requestConfig from '@/config/requestConfig'
import { Loading } from 'element-ui'

let reqNum = 0
let loadingFuc = null

// 创建axios实例
const service = axios.create({
  withCredentials: false,
  timeout: requestConfig.timeOut || 10000,
})

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 获取接口的自定义配置
    let customConfig = config.custom

    // 判断对应接口的baseUrl版本,如果有特殊处理，就在对应接口中声明版本即可
    const urlVersion = typeof customConfig.BaseURLVersion == 'undefined' ? requestConfig.BaseURLVersion : customConfig.BaseURLVersion
    customConfig.baseURL = requestConfig[`urlVersion${urlVersion}`]

    // 是否设置头部参数
    const isHeaderParams = typeof customConfig.isHeaderParams == 'undefined' ? requestConfig.isHeaderParams : customConfig.isHeaderParams

    if (isHeaderParams) {
      customConfig.headers['ssoEnable'] = requestConfig.isSSOEnable
      customConfig.headers['Content-Type'] = 'application/json;charset=utf-8'
    }

    // 是否需要设置token
    const isToken = typeof customConfig.isToken == 'undefined' ? requestConfig.isToken : customConfig.isToken
    if (getToken() && isToken) {
      customConfig.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }

    // 判断该接口是否需要loading
    const isLoading = typeof customConfig.isLoading == 'undefined' ? requestConfig.isLoading : (config || {}).isLoading
    if (isLoading) reqNum++
    if (reqNum > 0) loadingFuc = Loading.service({ fullscreen: true })

    // get请求映射params参数，ruoyi通用的get对象参数处理方法
    if (config.method === 'get' && config.params) {
      let url = config.url + '?'
      for (const propName of Object.keys(config.params)) {
        const value = config.params[propName]
        var part = encodeURIComponent(propName) + '='
        if (value !== null && typeof value !== 'undefined') {
          if (typeof value === 'object') {
            for (const key of Object.keys(value)) {
              let params = propName + '[' + key + ']'
              var subPart = encodeURIComponent(params) + '='
              url += subPart + encodeURIComponent(value[key]) + '&'
            }
          } else {
            url += part + encodeURIComponent(value) + '&'
          }
        }
      }
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 判断该接口是否需要取消全局loading效果
    const isLoading = typeof res.config.isLoading == 'undefined' ? requestConfig.isLoading : res.config.isLoading
    if (isLoading) reqNum--
    if (reqNum == 0 && isLoading) loadingFuc.close()

    // 未设置状态码则默认成功状态
    const code = res.data.code || 200 || 20000 || 20001
    // 获取错误信息
    const msg = errorCode[code] || res.data.msg || errorCode['default']

    return res.data
  },
  (error) => {
    let { message } = error
    console.log(message)
    return Promise.reject(error)
  }
)

export default service
