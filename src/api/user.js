import request from "@/utils/request";
import qs from 'qs'
/** 登录 post */
export function userLogin(phone,password,brand_id) {
  return request({
    url: '/user/app/login',
    method: 'post',
    data:qs.stringify({
              "phone":phone,//手机号
              "password":password,//密码
              "brand_id":brand_id,//贴牌id
          }),
  })
}

/**验证支付密码  post */
export function paypassAuth(token,paypass) {
  return request({
    url: '/user/app/paypass/auth/'+token,
     method: 'post',
    data:qs.stringify({
              "paypass":paypass,
          }),
  })
}


/** 获取个人信息 post */
export function userInfoQuery(token) {
  return request({
    url: '/user/app/info/query/'+token,
    method: 'get',
  })
}


/**查询上级  post */
export function preUserQuery(brandId,phone) {
  return request({
      url: '/user/app/query/phone',
      method: 'post',
      data:qs.stringify({
          "brandId":brandId,
          "phone":phone,
      })
  })
}


// 获取用户头像
export function getUserHead(phone,brandId){
  return request({
      url: '/user/app/headportrait/getby/phone/',
      method: 'POST',
      data: qs.stringify({
          'phone':phone,
          'brandId':brandId,
      })
  })
}

// 更换用户头像
export function setUserHead(formData){
  return request({
      url: '/user/app/headportrait/updateby/phone/',
      method: 'post',
      data: formData
  })
}
// 更换用户昵称
export function setUsernickName(nickName){
  return request({
      url: '/user/app/update/users/nick/name',
      method: 'post',
      data: qs.stringify({
        'nickName':nickName
      })
  })
}
// 查询用户层级
export function userGradeQuery(userId){
  return request({
      url: '/transactionclear/app/KdGrade/display',
      method: 'post',
      data: qs.stringify({
        'userId':userId,
    })
  })
}

/** 获取个人消息 post */
export function userJpushHistory(token,size) {
  return request({
      url: '/user/app/jpush/history/'+token,
      method: 'get',
      params:{
          "size":size 
      }
  })
}

/** 账户资产 post */
export function getAccountQuery(token) {
  return request({
      url: '/user/app/account/query/'+token,
      method: 'get',
  })
}

/** 获取今日和所有收益 post */
export function getSumrebater(user_id) {
  return request({
      url: '/user/app/rebate/query/sumrebate',
      method: 'post',
      data:qs.stringify({
          "user_id":user_id,//贴牌id
      }),
  })
}

/** 余额提现 post */
export function withdraw(amount,phone,brandId) {
  return request({
      url: '/facade/app/withdraw/',
      method: 'post',
      data:qs.stringify({
          "order_desc":'【余额提现】',//密码
          "channe_tag":'UMP_QUICK',//密码
          "amount":amount,//密码
          "phone":phone,//密码
          "brandId":brandId,//密码
      }),
  })
}

/** 获取默认卡 post */
export function bankDefault(user_id) {
  return request({
      url: '/user/app/bank/default/userid',
      method: 'post',
      data:qs.stringify({
          "user_id":user_id,//密码
      }),
  })
}

// 提交实名信息
export function updateRealnameImage(bankFile){
  return request({
    url: '/notice/app/tysj/IDOCR/distinguish',
    method: 'post',
    data: bankFile,
  })
}
// 提交服务器图片
export function submitImage(data){
  return request({
    url: '/user/app/oss/picture',
    'Access-Control-Allow-Origin':'*',
    method: 'post',
    data
  })
}
// 获取行为特征图片
export function getImg(appid,timestamp,sign,imageId  ){
  return request({
    url:`https://api.shumaidata.com/v2/life/check/image`,
    method: 'post',
    responseType: "blob" ,   //表明返回服务器返回的数据类型
    data:qs.stringify({
      appid,
      timestamp,
      sign ,
      imageId
    })
  })
}
// 提交人脸验证
export function humanFace(data){
  return request({
    url: 'https://api.shumaidata.com/v2/life/check',
    method: 'post',
    data
  })
}

// 提交人脸验证
export function cardComparison(data){
  return request({
    url: '/user/app/tysj/IDCard/contrast',
    method: 'post',
    data
  })
}

// 提交实名
export function submitAutonym(idcard,name,image,address){
  return request({
    url: '/user/app/tysj/IDCard/contrast',
    method: 'post',
    data:qs.stringify({
      idcard,name,image,address
    })
  })
}
// OCR扫描银行卡
// export function bankCardOcr(data){
//   return request({
//     url: '/paymentchannel/app/auth/bankcardocr',
//     method: 'post',
//     data: data,
//   })
// }
// export function updateRealnameImage(formData){
//   return request({
//     url: '/notice/app/tysj/IDOCR/distinguish',
//     method: 'post',
//     headers: {"Content-Type":"multipart/form-data"},
//     data: formData,
//   })
// }

