<template>
  <div>
    <van-nav-bar title="绑卡" left-arrow @click-left="onClickLeft"/>
    <div class="warpper">
      <div class="upcreditcard_title">信息加密处理，仅用于银行验证，请验证您本人的银行卡</div>
      <div class="card_box">
        <div class="card_item">
          <van-field v-model="card.userName" label="持卡人" readonly="readonly"/>
          <van-field v-model="card.cardNo" label="卡号" placeholder="请输入信用卡号" clearable minlength="10"
                     readonly="readonly"></van-field>
          <van-field v-model="card.securityCode" label="安全码" maxlength="3" readonly="readonly"
                     placeholder="请输入(卡背面CVN2后三位数字)" clearable>
          </van-field>
          <van-field v-model="card.expiredTime" label="有效期" maxlength="4" readonly="readonly"
                     placeholder="请输入(如09/22输入0922)" clearable/>
          <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入验证码">
            <template #button>
              <van-button size="small" plain type="danger" @click="message == '获取验证码' ? getCode() : ''">{{ message }}
              </van-button>
            </template>
          </van-field>
        </div>
      </div>
      <guide step='6' @next="stepType=false" v-show="stepType"/>
      <div class=" upcreditcard_btn_box">
        <van-button @click.native="confirm()" type="primary" class=" upcreditcard_btn  " round>确认</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import guide from '@/components/guide/guide'
import {NavBar, Cell, CellGroup, Field, Picker, Popup, Button, Icon} from 'vant';
import {creditcardTask, bindCardMsg} from "@/api/plan/plan";
import request from '@/utils/request'
import {userInfoQuery} from '@/api/user'
import qs from 'qs'

export default {
  data() {
    return {
      url: '',
      token: localStorage.getItem('token'),
      card: "",
      brandId: localStorage.getItem('brandId'),
      userId: localStorage.getItem('userId'),
      phoneTrueFalseBy: false,
      codeTrueFalseBy: false,
      smsCode: "",
      num: 60,
      orderCode: "",
      channelactive: {},
      authorityList: {
        result: {
          bankCard: "",
          userName: "",
          phone: "",
          securityCode: "",
          expiredTime: "",
        }
      },
      userList: {},
      sms: '',
      message: '获取验证码',
      getSmsUrl: '',
      stepType: true,
      dydata: {},
      money: 0
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
    [Button.name]: Button,
    [Icon.name]: Icon,
    guide
  },
  computed: {},
  created() {
    this.card = JSON.parse(this.$route.params.card)
    this.authorityList = JSON.parse(this.$route.params.authorityList)
    this.getSmsUrl = this.$route.params.url
    this.money = this.$route.params.money
    this.dydata = this.jqueryUrl(decodeURI(this.getSmsUrl))
  },
  methods: {
    time() {
      this.$store.commit('closeLoading')
      let timer = setInterval(() => {
        this.message = "(" + this.num + ")秒";
        this.num--;
        if (this.num == 0) {
          clearInterval(timer);
          this.num = 60;
          this.message = "获取验证码";
        }
      }, 1000);
    },
    getCode() {
      this.$store.commit('Loading')
      if (this.authorityList.channelTag == "DYPay_QUICK") {
        request({
          url: '/paymentgateway/topup/dy/bindCardMsg',
          method: 'post',
          data: qs.stringify({
            'idCard': this.dydata.idCard,
            'bankName': this.dydata.bankName,
            'userName': this.dydata.userName,
            'bankCard': this.dydata.bankCard,
            'phone': this.dydata.phone,
            'expiredTime': this.dydata.expiredTime,
            'securityCode': this.dydata.securityCode,
            'orderCode': this.dydata.orderCode
          })
        }).then(res => {
          this.time()
          this.url = res.resp_message
        })
      } else {
        request({
          url: this.getSmsUrl,
          method: 'post',
        }).then(res => {
          this.time()
          this.url = res.result
        })
      }
    },
    confirm() {
      if (this.sms == '' || this.sms == null) {
        this.$toast({message: '请填写验证码', position: 'bottom'})
        return
      }
      if (this.authorityList.channelTag == "DYPay_QUICK") {
        this.$store.commit('Loading')
        request({
          url: '/paymentgateway/topup/dy/bindCard',
          method: 'post',
          data: qs.stringify({
            'idCard': this.dydata.idCard,
            'bankName': this.dydata.bankName,
            'bankCard': this.dydata.bankCard,
            'phone': this.dydata.phone,
            'smsCode': this.sms,
            'bindcardmessageid': this.url
          })
        }).then(response => {
          this.$store.commit('closeLoading')
          if (response.resp_code == '000000') {

            this.$router.push({
              name: 'confirmAtion',
              params: {
                authorityList: JSON.stringify(this.authorityList),
                card: JSON.stringify(this.card),
                url: this.dydata.orderCode,
                dy: 1,
                money: this.money
              }
            })
          } else if (response.resp_code == '999999') {
            this.$toast({message: response.resp_message, position: 'bottom'})
          }
        })
      } else if (this.authorityList.channelTag == "TTFPay_1_QUICK") {
        this.$store.commit('Loading')
        request({
          url: this.url + this.sms,
          method: 'post',
        }).then(response => {
          this.$store.commit('closeLoading')
          if (response.resp_code == '000000') {
            this.$toast({message: response.resp_message, position: 'bottom'})
            this.$router.push({
              name: 'confirmAtion',
              params: {
                authorityList: JSON.stringify(this.authorityList),
                card: JSON.stringify(this.card),
                url: response.result,
                money: this.money,
                dy: 0
              }
            })
          } else if (response.resp_code == '999999') {
            this.$toast({message: response.resp_message, position: 'bottom'})
          }
        })
      } else {
        this.$store.commit('Loading')
        request({
          url: this.url,
          method: 'post',
          data: qs.stringify({
            'smsCode': this.sms,
            'msgcode': this.sms
          })
        }).then(response => {
          this.$store.commit('closeLoading')
          if (response.resp_code == '000000') {
            this.$toast({message: response.resp_message, position: 'bottom'})
            this.$router.push({
              name: 'confirmAtion',
              params: {
                authorityList: JSON.stringify(this.authorityList),
                card: JSON.stringify(this.card),
                url: response.result,
                money: this.money,
                dy: 0
              }
            })
          } else if (response.resp_code == '999999') {
            this.$toast({message: response.resp_message, position: 'bottom'})
          }
        })
      }
    },
    jqueryUrl(url) {
      //将地址从"？"位置分割成两部分
      var arr = url.split('?');
      //取地址右边参数部分从"&"位置继续分割，成为单独参数列表
      var params = arr[1].split('&'); //得到[a=1,b=2,c=3]
      //定义一个空对象
      var obj = {};
      for (var i = 0; i < params.length; i++) {
        var param = params[i].split('='); //得到[a,1]、[b,2]、[c,3]
        obj[param[0]] = param[1]; //为对象赋值
      }
      return obj;
    },
    onClickLeft() {
      this.publicJs.back();
    },
  }
};
</script>
<style scoped>
.upcreditcard_title {
  height: 40px;
  background: rgba(254, 161, 51, .3);
  line-height: 40px;
  width: 100%;
  color: #F5552A;
  font-size: 12px;
  padding: 0 15px;
}

.upcreditcard_tips {
  font-size: 10px;
  line-height: 22px;
  padding: 0 10px;
}

.upcreditcard_btn_box {
  margin: 20px auto;
  width: 100%;
  text-align: center;
}

.upcreditcard_btn {
  /* height:40px; */
  width: 80%;
}

.card_box {
  width: 100%;
  padding: 10px 10px 0 10px;
}

.card_item {
  width: 100%;
  padding: 5px;
  border-radius: 12px;
  background: #fff;
}

.box {
  text-align: center;
  padding: 30px 39px;
  width: 320px;
}

.box .title {
  font-size: 17px;
}

.box .bg {
  background: url("https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/addcard/security_code.png") center no-repeat;
  background-size: 100% 100%;
  height: 123px;
  width: 194px;
  margin: 20px auto 0 auto;
}

.box .tips {
  text-align: left;
  color: #666;
  font-size: 13px;
  margin: 10px 0 30px 0;
}

.box .btn {
  width: 138px;
  height: 33px;
  background: #F71111;
  border-radius: 16px;
  font-size: 14px;
  color: #fff;
  line-height: 33px;
  margin: 0 auto;
}


</style>
