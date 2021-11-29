import request from '@/utils/request'
import { getIp } from "@/utils/request";
import qs from 'qs'

var http = getIp()
/** 查询省份 ( POST)*/
export function provinceQuery(version, item, version1, channelTag) {
  let that = this
  var obj = {}
  obj[2] = function () {
    return request({
      url: http + '/paymentgateway/topup/lmymerchant/getlmyprovince/andcity',
      method: 'post',
    })
  }
  obj[4] = function () {
    return request({
      url: http + '/paymentgateway/topup/tl/getprovince',
      method: 'POST',
    })
  }
  obj[5] = function () {
    return request({
      url: http + '/paymentgateway/topup/kftde/getkftprovince',
      method: 'post',
    })
  }

  obj[7] = () => {
    return new Promise(res => {
      var data = {
        resp_code: "333333"
      }
      res(data)
    })
  }
  obj[8] = obj[4]
  obj[20] = obj[2]
  obj[21] = obj[2]

  obj[25] = function () {
    return request({
      url: http + '/paymentgateway/topup/hqi/getprovince',
      method: 'POST',
    })
  },
    obj[26] = obj[25]
  obj[30] = function () {
    return request({
      url: http + '/paymentgateway/topup/lmgmerchant/getlmgprovince/andcity',
      method: 'post'
    })
  }
  obj[32] = function () {
    return request({
      url: http + '/paymentgateway/topup/hx/query/province',
      method: 'post'
    })
  }
  obj[37] = function () {
    return request({
      url: http + '/paymentgateway/topup/mc/cj/province',
      method: 'post'
    })
  }
  obj[38] = obj[7]
  obj[39] = function () {
    return request({
      url: http + '/paymentgateway/topup/hqj/query/province',
      method: 'post'
    })
  }
  obj[41] = function () {
    return request({
      url: http + '/paymentgateway/topup/ddt/queryprovince',
      method: 'post'
    })
  }
  obj[42] = function () {
    return request({
      url: http + '/paymentgateway/topup/lmlmerchant/getlmyprovince/andcity',
      method: 'post'
    })
  }
  obj[43] = function () {
    return request({
      url: http + '/paymentgateway/topup/ielpm/getprovince',
      method: 'post'
    })
  }
  obj[44] = function () {
    return request({
      url: http + '/paymentgateway/topup/jx/ld/query/province',
      method: 'post'
    })
  }
  obj[45] = function () {
    return request({
      url: http + '/paymentgateway/topup/xs/dh/query/province',
      method: 'post'
    })
  }
  obj[46] = function () {
    return request({
      url: http + '/paymentgateway/topup/jx/xh/query/province',
      method: 'post'
    })
  }
  obj[47] = function () {
    return request({
      url: http + '/paymentgateway/topup/pyx/hcde/query/province',
      method: 'post',
      data: qs.stringify({
        'idCard': item.idcard, //
      })
    })
  }

  obj[50] = function () {
    return request({
      url: 'https://application.mingchetech.com/v1.0' + '/creditcardmanager/app/query/area/by/areaid',
      method: 'get',

    })
  }
  obj[51] = function () {
    return request({
      url: http + '/paymentgateway/topup/dy/getProvince',
      method: 'post',
    })
  }
  obj[52] = function () {
    return request({
      url: http + '/paymentgateway/topup/hxnew/query/province',
      method: 'post',
    })
  }
  obj[53] = function () {
    return request({
      url: http + '/paymentgateway/topup/xsxe/province',
      method: 'post',
    })
  }
  obj[54] = function () {
    return request({
      url: http + '/paymentgateway/topup/jft/largeRepayment/getProvince',
      method: 'post',
    })
  }
  obj[55] = function () {
    return request({
      url: http + '/paymentgateway/topup/jft/smallRepayment/getProvince',
      method: 'post',
      data: qs.stringify({
        'version': version1
      })
    })
  }
  obj[56] = function () {
    return request({
      url: http + '/paymentgateway/topup/pyx/tlxe/getprovince',
      method: 'post',
    })
  }
  obj[58] = obj[2]
  obj[59] = obj[2]
  obj[61] = function () {
    return request({
      url: http + '/paymentgateway/topup/smallRepayment/ys/getProvince',
      method: 'post',
    })
  }
  obj[62] = function () {
    return request({
      url: http + '/paymentgateway/topup/hcde/query/province',
      method: 'post',
      data: qs.stringify({
        'idCard': item.idcard
      })
    })
  }
  obj[63] = function () {
    return request({
      url: http + '/paymentgateway/topup/ykde/query/province',
      method: 'post',
      data: qs.stringify({
        'idCard': item.idcard
      })
    })
  }
  obj[65] = function () {
    return request({
      url: http + '/paymentgateway/topup/smallRepayment/jk/getProvince',
      method: 'post',
    })
  }
  obj[66] = function () {
    return request({
      url: http + '/paymentgateway/topup/ffhk/province',
      method: 'post',
    })
  }
  obj[69] = function () {
    return request({
      url: http + '/paymentgateway/topup/npxe/province',
      method: 'post',
    })
  }
  obj[70] = function () {
    return request({
      url: http + '/paymentgateway/topup/jfxe/province',
      method: 'post',
    })
  }
  obj[71] = function () {
    return request({
      url: http + '/paymentgateway/topup/paf/xe/query/province',
      method: 'post',
    })
  }
  obj[72] = function () {
    return request({
      url: http + '/paymentgateway/topup/pyx/jxsqxe/new/get/province',
      method: 'post',
    })
  }
  obj[73] = function () {
    return request({
      url: http + '/paymentgateway/topup/rb/query/province',
      method: 'post',
    })
  }
  obj[74] = function () {
    return request({
      url: http + '/paymentgateway/topup/rbwx/query/province',
      method: 'post',
    })
  }
  obj[76] = function () {
    return request({
      url: http + '/paymentgateway/topup/xswx/province',
      method: 'post',
    })
  }
  obj[75] = function () {
    return request({
      url: http + '/paymentgateway/topup/repayment/sxy/getProvinces',
      method: 'post',
    })
  }
  obj[77] = function () {
    return request({
      url: http + '/paymentgateway/topup/pgs/get/province',
      method: 'post',
    })
  }
  obj[78] = function () {
    return request({
      url: http + '/paymentgateway/topup/tft/de/get/province',
      method: 'post',
    })
  }
  obj[79] = function () {
    return request({
      url: http + '/paymentgateway/topup/pafwx/query/province',
      method: 'post',
    })
  }
  obj[80] = function () {
    return request({
      url: http + '/paymentgateway/topup/kft/de/query/province',
      method: 'post',
      data: qs.stringify({
        "bankName": item.bankName
      })
    })
  }
  obj[81] = function () {
    return request({
      url: http + '/paymentgateway/topup/kzj/ffde/query/province',
      method: 'post',
      data: qs.stringify({
        "bankName": item.bankName
      })
    })
  }
  obj[82] = function () {
    return request({
      url: http + '/paymentgateway/topup/kzj/ffxe/query/province',
      method: 'post',
    })
  }
  obj[83] = function () {
    return request({
      url: http + '/paymentgateway/topup/repayment/ttf1/getProvinces',
      method: 'post',
    })
  }
  obj[84] = function () {
    return request({
      url: http + '/paymentgateway/topup/mowx/province',
      method: 'post',
    })
  }
  obj[85] = function () {
    return request({
      url: http + '/paymentgateway/topup/rzx/province',
      method: 'post',
    })
  }
  obj[86] = function () {
    return request({
      url: http + '/paymentgateway/topup/kzj/sft/query/province',
      method: 'post',
    })
  }
  obj[87] = function () {
    return request({
      url: http + '/paymentgateway/topup/tyde/province',
      method: 'post',
    })
  }
  obj[88] = function () {
    return request({
      url: http + '/paymentgateway/topup/mc/gyf/query/province',
      method: 'post',
    })
  }
  obj[89] = function () {
    return request({
      url: http + '/paymentgateway/topup/kzj/sft/xe/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[91] = function () {
    return request({
      url: http + '/paymentgateway/topup/hj/kj/query/province',
      method: 'post',
      data: qs.stringify({
        "bankName": item.bankName
      })
    })
  }
  obj[92] = function () {
    return request({
      url: http + '/paymentgateway/topup/hj/xe/kj/query/province',
      method: 'post',
      data: qs.stringify({
        "bankName": item.bankName
      })
    })
  }
  obj[93] = function () {
    return request({
      url: http + '/paymentgateway/topup/xhde/province',
      method: 'post',
    })
  }
  obj[94] = function () {
    return request({
      url: http + '/paymentgateway/topup/mc/tx/xe/query/province',
      method: 'post',
    })
  }
  obj[95] = function () {
    return request({
      url: http + '/paymentgateway/topup/tyde/8907/province',
      method: 'post',
    })
  }
  obj[96] = function () {
    return request({
      url: http + '/paymentgateway/topup/gyf/r16/province',
      method: 'post',
    })
  }
  obj[97] = function () {
    return request({
      url: http + '/paymentgateway/topup/hcgyf/query/province',
      method: 'post',
    })
  }
  obj[98] = function () {
    return request({
      url: http + '/paymentgateway/topup/tyde/8902/province',
      method: 'post',
    })
  }
  obj[99] = function () {
    return request({
      url: http + '/paymentgateway/topup/tyde/8904/province',
      method: 'post',
    })
  }
  obj[100] = obj[96]
  obj[101] = function () {
    return request({
      url: http + '/paymentgateway/topup/ttf/0709/de/query/province',
      method: 'post',
    })
  }
  obj[102] = function () {
    return request({
      url: http + '/paymentgateway/topup/lmd/query/province',
      method: 'post',
    })
  }
  obj[103] = obj[7]
  obj[110] = function () {
    return request({
      url: http + '/paymentgateway/topup/ttf/province',
      method: 'post',
    })
  }
  obj[111] = function () {
    return request({
      url: http + '/paymentgateway/topup/tft/province',
      method: 'post',
    })
  }
  obj[140] = function () {
    return request({
      url: '/paymentgateway/verification/getcitycode',
      method: 'post',
      data: qs.stringify({
        type: '1',
        'channelTag': channelTag
      })
    })
  }
  obj[120] = function () {
    return request({
      url: http + '/paymentgateway/topup/gyf/province',
      method: 'post',
    })
  }
  return obj[version]()
}

/** 查询市 ( POST)*/
export function cityQuery(version, bankCard, item, version1, channelTag) {
  var obj = {}

  obj[4] = function () {
    return request({
      url: http + '/paymentgateway/topup/tl/getcitycode/byparentcode',
      method: 'POST',
      data: qs.stringify({
        "parentCode": bankCard,//
      }),
    })
  }
  obj[5] = function () {
    return request({
      url: http + '/paymentgateway/topup/kftde/getkftdecitybyprovince',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }


  obj[8] = obj[4]
  obj[25] = function () {
    return request({
      url: http + '/paymentgateway/topup/hqi/getcity',
      method: 'POST',
      data: qs.stringify({
        "province": bankCard,//
      }),
    })
  }
  obj[26] = obj[25]
  obj[32] = function () {
    return request({
      url: http + '/paymentgateway/topup/hx/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard
      })
    })
  }
  obj[37] = function () {
    return request({
      url: http + '/paymentgateway/topup/mc/cj/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard
      })
    })
  }
  obj[39] = function () {
    return request({
      url: http + '/paymentgateway/topup/hqj/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard
      })
    })
  }
  obj[41] = function () {
    return request({
      url: http + '/paymentgateway/topup/ddt/querycity',
      method: 'post',
      data: qs.stringify({
        'province': bankCard
      })
    })
  }
  obj[43] = function () {
    return request({
      url: http + '/paymentgateway/topup/ielpm/getcitybyprovincecode',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard
      })
    })
  }
  obj[44] = function () {
    return request({
      url: http + '/paymentgateway/topup/jx/ld/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard
      })
    })
  }
  obj[45] = function () {
    return request({
      url: http + '/paymentgateway/topup/xs/dh/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard
      })
    })
  }
  obj[46] = function () {
    return request({
      url: http + '/paymentgateway/topup/jx/xh/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard
      })
    })
  }
  obj[47] = function () {
    return request({
      url: http + '/paymentgateway/topup/pyx/hcde/query/city',
      method: 'post',
      data: qs.stringify({
        'idCard': item.idcard, //
        'provinceCode': bankCard, //省份接口返回termKey
      })
    })
  }
  obj[50] = function () {
    return request({
      url: 'https://application.mingchetech.com/v1.0' + '/creditcardmanager/app/query/area/by/areaid',
      method: 'get',
      params: {
        "areaId": bankCard
      }
    })
  }
  obj[51] = function () {
    return request({
      url: http + '/paymentgateway/topup/dy/getCity',
      method: 'post',
      data: qs.stringify({
        'provinceId': bankCard,
      })
    })
  }
  obj[52] = function () {
    return request({
      url: http + '/paymentgateway/topup/hxnew/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[53] = function () {
    return request({
      url: http + '/paymentgateway/topup/xsxe/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[54] = function () {
    return request({
      url: http + '/paymentgateway/topup/jft/largeRepayment/getCity',
      method: 'post',
      data: qs.stringify({
        'areaCode': bankCard,
      })
    })
  }
  obj[55] = function () {
    return request({
      url: http + '/paymentgateway/topup/jft/smallRepayment/getCity',
      method: 'post',
      data: qs.stringify({
        'areaCode': bankCard,
        'version': version1,
      })
    })
  }
  obj[56] = function () {
    return request({
      url: http + '/paymentgateway/topup/pyx/tlxe/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[61] = () => {
    return new Promise(res => {
      var data = {
        resp_code: "333333"
      }
      res(data)
    })
  }

  obj[62] = function () {
    return request({
      url: http + '/paymentgateway/topup/hcde/query/city',
      method: 'post',
      data: qs.stringify({
        'idCard': item.idcard,
        'provinceCode': bankCard,
      })
    })
  }
  obj[63] = function () {
    return request({
      url: http + '/paymentgateway/topup/ykde/query/city',
      method: 'post',
      data: qs.stringify({
        'idCard': item.idcard,
        'provinceCode': bankCard,
      })
    })
  }
  obj[65] = function () {
    return request({
      url: http + '/paymentgateway/topup/smallRepayment/jk/getCity',
      method: 'post',
      data: qs.stringify({
        'areaCode': bankCard,
      })
    })
  }
  obj[66] = function () {
    return request({
      url: http + '/paymentgateway/topup/ffhk/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[69] = function () {
    return request({
      url: http + '/paymentgateway/topup/npxe/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[70] = function () {
    return request({
      url: http + '/paymentgateway/topup/jfxe/city',
      method: 'post',
      data: qs.stringify({
        'parentCode': bankCard,
      })
    })
  }
  obj[71] = function () {
    return request({
      url: http + '/paymentgateway/topup/paf/xe/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[72] = function () {
    return request({
      url: http + '/paymentgateway/topup/pyx/jxsqxe/new/get/city',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard,
      })
    })
  }
  obj[73] = function () {
    return request({
      url: http + '/paymentgateway/topup/rb/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[74] = function () {
    return request({
      url: http + '/paymentgateway/topup/rbwx/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[76] = function () {
    return request({
      url: http + '/paymentgateway/topup/xswx/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[75] = function () {
    return request({
      url: http + '/paymentgateway/topup/repayment/sxy/getCitys',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard,
      })
    })
  }
  obj[77] = function () {
    return request({
      url: http + '/paymentgateway/topup/pgs/get/city',
      method: 'post',
      data: qs.stringify({
        'areaCode': bankCard,
      })
    })
  }
  obj[78] = function () {
    return request({
      url: http + '/paymentgateway/topup/tft/de/get/city',
      method: 'post',
      data: qs.stringify({
        'areaParentId': bankCard,
      })
    })
  }
  obj[79] = function () {
    return request({
      url: http + '/paymentgateway/topup/pafwx/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[80] = function () {
    return request({
      url: http + '/paymentgateway/topup/kft/de/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
        "bankName": item.bankName
      })
    })
  }
  obj[81] = function () {
    return request({
      url: http + '/paymentgateway/topup/kzj/ffde/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
        "bankName": item.bankName
      })
    })
  }
  obj[82] = function () {
    return request({
      url: http + '/paymentgateway/topup/kzj/ffxe/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[83] = function () {
    return request({
      url: http + '/paymentgateway/topup/repayment/ttf1/getCitys',
      method: 'post',
      data: qs.stringify({
        'provinceName': bankCard,
      })
    })
  }
  obj[84] = function () {
    return request({
      url: http + '/paymentgateway/topup/mowx/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[85] = function () {
    return request({
      url: http + '/paymentgateway/topup/rzx/city',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard,
      })
    })
  }
  obj[86] = function () {
    return request({
      url: http + '/paymentgateway/topup/kzj/sft/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[87] = function () {
    return request({
      url: http + '/paymentgateway/topup/tyde/city',
      method: 'post',
      data: qs.stringify({
        'parentId': bankCard,
      })
    })
  }
  obj[88] = function () {
    return request({
      url: http + '/paymentgateway/topup/mc/gyf/query/city',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard,
      })
    })
  }
  obj[89] = function () {
    return request({
      url: http + '/paymentgateway/topup/kzj/sft/xe/query/province',
      method: 'post',
    })
  }
  obj[91] = function () {
    return request({
      url: http + '/paymentgateway/topup/hj/kj/query/city/by/province',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
        "bankName": item.bankName
      })
    })
  }
  obj[92] = function () {
    return request({
      url: http + '/paymentgateway/topup/hj/xe/kj/query/city/by/province',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
        "bankName": item.bankName
      })
    })
  }
  obj[93] = function () {
    return request({
      url: http + '/paymentgateway/topup/xhde/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[94] = function () {
    return request({
      url: http + '/paymentgateway/topup/mc/tx/xe/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[95] = function () {
    return request({
      url: http + '/paymentgateway/topup/tyde/8907/city',
      method: 'post',
      data: qs.stringify({
        'parentId': bankCard,
      })
    })
  }
  obj[96] = function () {
    return request({
      url: http + '/paymentgateway/topup/gyf/r16/city',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard,
      })
    })
  }
  obj[97] = function () {
    return request({
      url: http + '/paymentgateway/topup/hcgyf/query/city',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard,
      })
    })
  }
  obj[98] = function () {
    return request({
      url: http + '/paymentgateway/topup/tyde/8902/city',
      method: 'post',
      data: qs.stringify({
        'parentId': bankCard,
      })
    })
  }
  obj[99] = function () {
    return request({
      url: http + '/paymentgateway/topup/tyde/8904/city',
      method: 'post',
      data: qs.stringify({
        'parentId': bankCard,
      })
    })
  }
  obj[100] = obj[96]
  obj[101] = function () {
    return request({
      url: http + '/paymentgateway/topup/ttf/0709/de/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[102] = function () {
    return request({
      url: http + '/paymentgateway/topup/lmd/query/city',
      method: 'post',
      data: qs.stringify({
        'province': bankCard,
      })
    })
  }
  obj[110] = function () {
    return request({
      url: http + '/paymentgateway/topup/ttf/city',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard,
      })
    })
  }
  obj[111] = function () {
    return request({
      url: http + '/paymentgateway/topup/tft/city',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard,
      })
    })
  }
  obj[140] = function () {
    return request({
      url: '/paymentgateway/verification/getcitycode',
      method: 'post',
      data: qs.stringify({
        type: '2',
        'provinceCode': bankCard,
        "channelTag": item,
      })
    })
  }
  obj[120] = function () {
    return request({
      url: http + '/paymentgateway/topup/gyf/city',
      method: 'post',
      data: qs.stringify({
        'provinceCode': bankCard,
      })
    })
  }
  return obj[version]()
}

/** 查询区域 ( POST)*/
export function areaQuery(version, province, city) {
  var obj = {}
  obj[79] = function () {
    return request({
      url: http + '/paymentgateway/topup/pafwx/query/area',
      method: 'POST',
      data: qs.stringify({
        "province": province,//
        "city": city,//
      }),
    })
  }
  return obj[version]()
}


/** 查询商户 ( POST)*/
export function queryMerchant(version, extra, bankName, item, version1) {
  // return
  var obj = {}
  obj[2] = function () {
    return request({
      url: http + '/paymentgateway/topup/lmymerchant/getlmymerchant',
      method: 'post',
      data: qs.stringify({
        "addressCode": extra.cityCode.split(',')[0],//
        "mcc": 0
      }),
    })
  }
  obj[4] = () => {
    return new Promise(res => {
      var data = {
        resp_code: "333333"
      }
      res(data)
    })
  }
  obj[5] = obj[4]
  obj[7] = obj[4]
  obj[8] = obj[4]
  obj[20] = obj[2]
  obj[21] = obj[2]
  obj[25] = function () {
    return request({
      url: http + '/paymentgateway/topup/hqi/getmcc',
      method: 'POST',
    })
  },
    obj[26] = obj[25]
  obj[30] = function () {
    return request({
      url: http + '/paymentgateway/topup/lmgmerchant/getlmgmerchant',
      method: 'post',
      data: qs.stringify({
        'addressCode': extra.cityCode.split(',')[0]
      })
    })
  }
  obj[32] = function () {
    return request({
      url: http + '/paymentgateway/topup/hx/query/mcc',
      method: 'post',
      data: qs.stringify({
        'mcc': extra.merarea
      })
    })
  }
  obj[37] = obj[4]
  obj[39] = function () {
    return request({
      url: http + '/paymentgateway/topup/hqj/query/merchant',
      method: 'post',
      data: qs.stringify({
        "province": extra.provinceId.split(',')[0],//取省接口返回的 code
        "city": extra.cityCode.split(',')[0],//取省接口返回的 code
      })
    })
  }
  obj[41] = obj[4]
  obj[42] = function () {
    return request({
      url: http + '/paymentgateway/topup/lmlmerchant/getlmlmerchant',
      method: 'post',
      data: qs.stringify({
        "addressCode": extra.cityCode.split(',')[0],//
        "bankName": bankName
      }),
    })
  }
  obj[43] = function () {
    return request({
      url: http + '/paymentgateway/topup/ielpm/getmccbycitycode',
      method: 'post',
      data: qs.stringify({
        'cityCode': extra.cityCode.split(',')[0], // 城市code编码
      })
    })
  }
  obj[44] = function () {
    return request({
      url: http + '/paymentgateway/topup/jx/ld/query/mcc',
      method: 'post',
      data: qs.stringify({
        'city': extra.cityCode.split(',')[1], // 城市code编码
      })
    })
  }
  obj[45] = function () {
    return request({
      url: http + '/paymentgateway/topup/xs/dh/query/merchant',
      method: 'post',
      data: qs.stringify({
        'city': extra.cityCode.split(',')[1], // 城市code编码
      })
    })
  }
  obj[46] = function () {
    return request({
      url: http + '/paymentgateway/topup/jx/xh/query/mcc',
      method: 'post',
      data: qs.stringify({
        'city': extra.cityCode.split(',')[1], // 城市code编码
      })
    })
  }
  obj[47] = function () {
    return request({
      url: http + '/paymentgateway/topup/pyx/hcde/query/mcc',
      method: 'post',
      data: qs.stringify({
        'idCard': item.idcard, // 城市的code
        'provinceCode': extra.provinceId.split(',')[0], // 省份接口返回termKey
        'cityCode': extra.cityCode.split(',')[0], // 省份接口返回termKey

      })
    })
  }
  obj[52] = function () {
    return request({
      url: http + '/paymentgateway/topup/hxnew/query/mcc',
      method: 'post',
      data: qs.stringify({
        'mcc': extra.merarea
      })
    })
  }
  obj[51] = obj[4]
  obj[50] = obj[4]
  obj[53] = obj[4]
  obj[54] = function () {
    return request({
      url: http + '/paymentgateway/topup/jft/largeRepayment/getMcc',
      method: 'post',
      data: qs.stringify({
        'areaCode': extra.cityCode.split(',')[0]
      })
    })
  }
  obj[55] = function () {
    return request({
      url: http + '/paymentgateway/topup/jft/smallRepayment/getAllMcc',
      method: 'post',
      data: qs.stringify({
        'version': version1,
        'areaCode': extra.cityCode.split(',')[0]
      })
    })
  }
  obj[56] = obj[4]
  obj[58] = obj[4]
  obj[59] = obj[4]
  obj[61] = obj[4]
  obj[62] = function () {
    return request({
      url: http + '/paymentgateway/topup/hcde/query/mcc',
      method: 'post',
      data: qs.stringify({
        'idCard': item.idcard,
        'provinceCode': extra.provinceId.split(',')[0], // 省份接口返回termKey
        'cityCode': extra.cityCode.split(',')[0], // 省份接口返回termKey
      })
    })
  }
  obj[63] = function () {
    return request({
      url: http + '/paymentgateway/topup/ykde/query/mcc',
      method: 'post',
      data: qs.stringify({
        'idCard': item.idcard,
        'provinceCode': extra.provinceId.split(',')[0], // 省份接口返回termKey
        'cityCode': extra.cityCode.split(',')[0], // 省份接口返回termKey
      })
    })
  }
  obj[65] = function () {
    return request({
      url: http + '/paymentgateway/topup/smallRepayment/jk/getMcc',
      method: 'post',
    })
  }
  obj[66] = obj[4]
  obj[69] = obj[4]
  obj[70] = obj[4]
  obj[71] = obj[4]
  obj[72] = obj[4]
  obj[73] = obj[4]
  obj[74] = obj[4]
  obj[76] = obj[4]
  obj[75] = obj[4]
  obj[77] = obj[4]
  obj[78] = obj[4]
  obj[79] = function () {
    return request({
      url: http + '/paymentgateway/topup/pafwx/query/mername',
      method: 'post',
      data: qs.stringify({
        'province': extra.provinceId.split(',')[1], // 省份接口返回termKey
        'city': extra.cityCode.split(',')[1], // 省份接口返回termKey
        'area': extra.areaId.split(',')[1], // 省份接口返回termKey
      })
    })
  }
  obj[80] = obj[4]
  obj[81] = obj[4]
  obj[82] = obj[4]
  obj[83] = function () {
    return request({
      url: http + '/paymentgateway/topup/repayment/ttf1/getMccs',
      method: 'post',
      data: qs.stringify({
        'cityName': extra.cityCode.split(',')[1], // 省份接口返回termKey
      })
    })
  }
  obj[84] = obj[4]
  obj[85] = obj[4]
  obj[86] = obj[4]
  obj[87] = obj[4]
  obj[88] = obj[4]
  obj[89] = obj[4]
  obj[91] = obj[4]
  obj[92] = obj[4]
  obj[93] = obj[4]
  obj[94] = obj[4]
  obj[95] = obj[4]
  obj[96] = obj[4]
  obj[97] = obj[4]
  obj[98] = obj[4]
  obj[99] = obj[4]
  obj[100] = function () {
    return request({
      url: http + '/paymentgateway/topup/hc/sh010/query/mcc',
      method: 'post',
    })
  }
  obj[101] = obj[4]
  obj[102] = obj[4]
  obj[110] = obj[4]
  obj[120] = obj[110]
  obj[111] = obj[110]
  obj[140] = obj[110]
  return obj[version]()
}


