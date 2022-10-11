import request from '@/utils/request'

// 疑似无效的接口
export function test() {
  return request({
    url: '/getBusinessList',
    method: 'get',
    custom: {
      BaseURLVersion: 1,
      isToken: true,
      isHeaderParams: true,
    },
    params: {
      type: 'assets',
      pageNum: '1',
      pageSize: '10',
    },
  })
}
