import request from '@/utils/request'
import qs from 'qs'

/**获取信用卡和默认卡  post */
export function userBankAndNature(userId,type,nature,isDefault) {
    return request({
        url: '/user/app/bank/query/byuseridandtype/andnature',
        method: 'post',
        data:qs.stringify({
            "userId":userId,
            "type":type, //充值卡：0   提现卡：2
            "nature":nature,//信用卡：0   储蓄卡：2
            "isDefault":isDefault,//传 1 就会获取一张默认的卡
        })
    })
}

// 设置默认卡
export function bankcardIsdefault(userId,bankCard,type) {
    return request({
        url: '/user/app/bankcard//create/isdefault',
        method: 'post',
        data:qs.stringify({
            "userId":userId,
            "bankCard":bankCard,
            "type":type,//信用卡：0   储蓄卡：2
        })
    })
}

/**根据银行卡去查询通道  post */
export function getchannelBybankcard(userId,bankCard,amount,brand_id,recommend) {
    return request({
        url: '/user/app/channel/getchannel/bybankcard/andamount',
        // url: '/user/app/channel/getchannel/bybankcard/andamount/new',
        method: 'post',
        data:qs.stringify({
            "userId":userId,
            "bankCard":bankCard,
            "amount":amount,
            "brandId":brand_id,
            "recommend":recommend, //1位获取默认通道，2获取所有通道
        })
    })
}

/** 快捷支持列表查询 post */
export function channelLimitQuery(channelTag) {
    return request({
        url: '/paymentchannel/app/supportbankbytag/query',
        method: 'post',
        data:qs.stringify({
            "channelTag":channelTag,//通道标示
        })
    })
}


/**充值  post */
export function newFacadeTopup(phone,userId,brandId,amount,channeTag,orderDesc,bankCard,creditBankName) {
    return request({
        url: '/facade/app/topup/new',
        method: 'post',
        data:qs.stringify({
            "phone":phone,
            "userId":userId,
            "brandId":brandId,
            "amount":amount,
            "channeTag":channeTag,
            "orderDesc":orderDesc,
            "bankCard":bankCard,
            "creditBankName":creditBankName,
        })
    })
}

/**电银快捷绑卡获取验证码 */
export function bindCardMsg(bankName,bankCard,userName,idCard,phone,orderCode,expiredTime,securityCode) {
    return request({
        url: '/paymentgateway/topup/dy/bindCardMsg',
        method: 'post',
        data:qs.stringify({
          bankName,
          bankCard,
          userName,
          idCard,
          phone,
          orderCode,
          expiredTime,
          securityCode
        })
    })
}
/**电银快捷绑卡 */
export function bindCard(phone,idCard,bankCard,bankName,smsCode,bindcardmessageid) {
    return request({
        url: '/paymentgateway/topup/dy/bindCard',
        method: 'post',
        data:qs.stringify({
           phone,
           idCard,
           bankCard,
           bankName,
           smsCode,
           bindcardmessageid    
        })
    })
}

/** 电银提交*/
export function silverSubmitted(orderCode,inprovincecode,incitycode,money) {
    return request({
        url: '/paymentgateway/topup/dy/Pay',
        method: 'post',
        data:qs.stringify({
          orderCode,
          inprovincecode,
          incitycode,
          money
        })
    })
}
