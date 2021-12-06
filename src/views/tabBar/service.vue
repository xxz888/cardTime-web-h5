<template>
  <div>
    <van-nav-bar class="contact_nav " :border='false' title="客服中心" left-arrow @click-left="onClickLeft"/>
    <div class="main">
      <div class="item">
        <h4 class="kefu">直接推荐人</h4>
        <a :href="'tel:'+prepreUserPhone">
          <p class="teler zi">
            手机号：{{ prepreUserPhone |dataHidden }}
            <img class="tel"
                 src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/contact/phone_btn_online_icon.png"
                 alt="">
          </p>
          <p class="zi">直接推荐人是使用卡时间的直接引导人,他可以为您提供卡时间功能使用说明，推广引导等服务。</p>
        </a>
      </div>
      <div class="item online " @click="meiqia">
        <p class="online">
          <van-icon name="chat-o" size="20px" :dot='$store.state.user.unread!=0'/>
          在线客服
        </p>
        <p class="zi">服务时间：每天9:00-21:00
          <van-tag type="warning">点击进入</van-tag>
        </p>
      </div>
      <div class="item" @click="copyShaneUrl()">
          <div>
            <span class="kefu">微信客服：</span>
          </div>
          <p class="zi">13336816566（同微信）
            <!-- <img class="tel"
                 src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/contact/phone_btn_online_icon.png"
                 alt=""> -->
          </p>
      </div>
      <div class="item">
        <div class="liu" @click="leave()">
          <span class="kefu">客服留言: </span> <span><van-badge :content="num" v-show="num"/></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {NavBar, Icon, Tag, Badge} from 'vant'
import {brandQuery} from '@/api/showBrand'
import {preUserQuery} from "@/api/user";

export default {
  data() {
    return {
      prepreUserPhone: '13336816566',
      brandPhone: '13336816566',
      num: ''
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    [Tag.name]: Tag,
    [Badge.name]: Badge
  },
  created() {
    this.num = this.$route.params.num
    this._preUserQuery()
    this.getBrand()
  },
  methods: {
        copyShaneUrl() {
                    window.location.href = 'weixin://';

      var input = document.createElement("input");     // 直接构建input
      input.value = "13336816566";   // 设置内容
      document.body.appendChild(input);        // 添加临时实例
      input.select();      // 选择实例内容
      document.execCommand("Copy");     // 执行复制
      document.body.removeChild(input);  // 删除临时实例
      this.$toast({message: '已成功复制到粘贴板', position: 'bottom'})
      //  window.open('https://mp.weixin.qq.com/s/AqOXs-jlj8TPBTzGrXXIAw')
    },
    meiqia() {
      _MEIQIA('init')
      _MEIQIA('showPanel')
    },
    leave() {
      this.$router.push({name: 'leave'})
    },
    getBrand() {
      brandQuery(this.global.brandId).then(res => {
        if (res.resp_code == "000000") {
          this.brandList = res.result
          this.brandPhone = res.result.brandPhone
        } else {
          this.$toast({message: res.data.resp_message, position: 'bottom'})
        }
      })
    },
    _preUserQuery() {
      preUserQuery(this.global.brandId, localStorage.getItem('phone')).then(res => {
        if (res.resp_code == "000000") {
          this.prepreUserPhone = res.result.preUserPhone
        }
      })
    },
    onClickLeft() {
      window.history.back()
      return
    }
  }
}
</script>
<style scoped>
>>> .van-tag--warning {
  padding: 2px;
  position: absolute;
  width: 60px;
  bottom: 3px;
  right: -15px;
  text-align: center;
  font-size: 11px;
  background-color: #C49A4D;
}

.online {
  color: #C49A4D;
  text-align: center;
  font-weight: 600;
  vertical-align: middle;
  font-size: 20px;
}

.kefu {
  font-size: 18px;
  font-weight: 600;
  margin-right: 5px;
  color: #000;
}

.item {
  padding: 15px;
  margin: 20px auto;
  box-shadow: 0px 1px 15px 1px #e7e7e7;
  font-size: 15px;
  border-radius: 5px;

}

.tel {
  float: right;
}

.teler {
  padding: 5px 0px;
}

.zi {
  position: relative;
  color: rgb(123, 123, 123);
  font-size: 13px;
  margin-top: 5px;
  font-weight: 400;
}

.item img {

  width: 22px;

}

.main {
  padding: 60px 25px 0px 25px;
  background-color: #fff;
  height: 100vh;
}

>>> .contact_nav {
  background: linear-gradient(180deg, #C49A4D 0%, #C49A4D 100%) !important;

}

>>> .van-nav-bar__title, >>> .van-nav-bar__arrow {
  color: #fff;
}

.liu {
  display: flex;
  justify-content: space-between;
}
</style>
