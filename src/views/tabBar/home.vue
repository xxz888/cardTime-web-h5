<template>
  <div class="home">
    <!-- 头部导航 -->
    <div class="home_header theme_bg ">
      <div class="home_header_item">
      </div>
      <div class="home_header_title">首页</div>
      <div class="home_header_item" @click="meiqia">
        <van-icon name="service-o" size="18px" :badge="dot? $store.state.user.unread:''"/>
        <span class="ke"> 客服 </span>
      </div>
    </div>
    <div class="warpper_top"></div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="加载中...">
      <div>
        <div class="nav_box theme_bg">
          <ul class="nav_list">
            <li class="nav_item">
              <img src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/nav_quick_icon.png"
                   @click="next('/online',8)" alt="">
              <div class="">信用卡收款</div>
            </li>
            <li class="nav_item" @click="next('/zero','1')">
              <img src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/nav_zero_icon.png" alt="">
              <div class="">空卡还款</div>
            </li>
            <li class="nav_item" @click="next('/creditcard','1')">
              <img src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/nav_creditcard_icon.png" alt="">
              <div class="">信用卡还款</div>
            </li>
          </ul>
        </div>
        <div class="menu_box">
          <ul class="menu_list">
            <li class="menu_item" @click="next('/agent',8)">
              <img src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/menu_agnet_icon.png" alt="">
              <div class="">顶级代理</div>
            </li>
            <li class="menu_item" @click="next('/credit',8)">
              <img src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/menu_rep_icon.png" alt="">
              <div class="">信用管理</div>
            </li>
            <li class="menu_item" @click="next('/profitHome',8)">
              <img src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/menu_profit_icon.png" alt="">
              <div class="">收益中心</div>
            </li>
            <li class="menu_item" @click="cardApply">
              <img src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/menu_creditcard_icon.png" alt="">
              <div class="">信用卡办卡</div>
            </li>
          </ul>
        </div>
        <div class="cont">
          <div class="news">
            <div class="left">
              <img src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/news_icon.png" alt="">
            </div>
            <div class="right" @click="next('/message',8)">
              <van-notice-bar :scrollable="false" background="none" class="home_notivce">
                <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
                  <van-swipe-item v-for="(item,index) in newsList" :key='index'>
                    <div class="new_swipe">
                      <span>发布日期 {{ item.createTime }}</span>
                      <div class="van-ellipsis">{{ item.content }}</div>
                      <p>{{ item.title }}</p>
                    </div>
                  </van-swipe-item>
                </van-swipe>
              </van-notice-bar>
            </div>
            <div class="icon">
              <van-icon class="icon_icon" size="16" name="arrow"/>
            </div>
          </div>
          <div class="activity_box">
            <div class="activity_title">
              <span>最新活动</span>
            </div>
            <div>
              <van-swipe class="activity_bg" v-for="(image, index) in bannerListDef" :autoplay="3000"
                         indicator-color="white" :key="index">
                <van-swipe-item>
                  <img :src="image.imgurl"/>
                </van-swipe-item>
              </van-swipe>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div class="tabbar_p"></div>
    <tabbar></tabbar>
    <guide step='1' @next="next('/online',8)"/>
  </div>
</template>

<script>
import {
  PullRefresh, NoticeBar, Swipe, SwipeItem, Icon
} from 'vant';
import tabbar from '@/components/tabbar'
import {userInfoQuery} from "@/api/user";
import {getBanner, newsQuery, getBrandNews, getMessage} from '@/api/showBrand'
import guide from '@/components/guide/guide'

export default {
  data() {
    return {
      dot: false,
      token: localStorage.getItem('token'),
      phone: localStorage.getItem('phone'),
      userId: localStorage.getItem('userId'),
      isLoading: false,
      bannerListDef: [],
      fuwuList: [],
      newsList: [],
      serviceNum: []
    }
  },
  components: {
    [PullRefresh.name]: PullRefresh,
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    tabbar,
    guide
  },
  created() {
    this.getBanners(0)
    this._getBrandNews()
    this._newsQuery()
    this._getMessage()
    this.isSealname()
  },
  activated() {
    this._getMessage()
  },
  beforeRouteEnter(to, from, next) {  //如果上个页面是绑卡页面或者登录页面执行下面方法
    if (from.name == 'depositCardAdd' || from.name == 'login') {
      next(vm => {
        vm.isSealname()
      })
    }
    next();
  },
  watch: {
    '$store.state.user.unread': value => {  //监听存储的客服消息客服按钮判断显示状态
      if (value > 0) {
        this.dot = true
      } else {
        this.dot = false
      }
    }
  },
  methods: {
    isSealname() { // 判断存储在本地的实名状态如果已实名开始判断认证状态
      if (localStorage.getItem('realnameStatus') != 1 && localStorage.getItem('realnameStatus') != null) {
        this.$toast({message: '请去APP实名后登录', position: 'bottom'})
        let did = localStorage.getItem('did')
        localStorage.clear()
        sessionStorage.clear()
        if (did) {
          localStorage.setItem('did', did)
        }
        this.$router.push({name: 'login'})
      } else {
        this._getUserMessage()
      }
    },
    //-----------获得用户信息-----------
    _getUserMessage() {
      userInfoQuery(localStorage.getItem('token')).then(res => {
        if (res.resp_code == "000000") {
          if (res.result.verificationStatus == 0) {
            this.$dialog.confirm({
              title: '温馨提示',
              message: '恭喜您注册实名成功，请认证信用卡，首刷认证后可获得10元奖励',
              confirmButtonText: '开始认证',
              cancelButtonText: '下次认证'
            }).then(() => {
              this.$store.commit('guide')
            })
          } else {
            this.$store.commit('closeGuide')
          }
        }
      })
    },
    _newsQuery(type) {
      newsQuery(this.global.brandId, '功能跳转').then(res => {
        if (res.resp_code == '000000') {
          this.fuwuList = res.result.content
        }
      })
    },
    //--------查询用户留言-----------
    _getMessage() {
      getMessage(this.userId).then(res => {
        let serviceNum = []
        if (res.resp_code == '000000') {
          res.result.forEach(item => {
            if (item.type == 0) {
              serviceNum.push(item)
            }
          });
          this.serviceNum = [...new Set(serviceNum)]
          if (this.$store.state.user.unread < this.serviceNum.length) {
            let num = this.$store.state.user.unread += this.serviceNum.length
            this.$store.commit('Unread', num)
          } else {
            return
          }
        }
      })
    },
    _getBrandNews() {
      getBrandNews(this.token, 20).then(res => {
        if (res.resp_code == '000000') {
          this.newsList = res.result.content
        }
      })
    },
    cardApply() {
      this.$router.push('/card/apply')
    },
    link(item) {
      let num = 0
      var ua = window.navigator.userAgent.toLowerCase();
      this.fuwuList.map((key) => {
        if (item == '信用卡办卡') {
          this.$toast({
            message: '网申渠道更新',
            position: 'bottom'
          })
          return
        }
        if (key.title == item) {
          var url = key.content + '?phone=' + this.phone + '&token=' + this.token + '&brandId=' + this.global.brandId + '&userId=' + this.userId + '&ip=' + this.global.ip + '&deviceId=' + localStorage.getItem('kd_webapp_deviceId')
          this.$router.push({
            name: 'appLink',
            params: {
              url: JSON.stringify(url),
              title: JSON.stringify(key.title),
              type: "2"
            }
          });
          return
        } else {
          num++
        }
      })
      if (num == this.fuwuList.length) {
        this.$toast({
          message: '敬请期待',
          position: 'bottom'
        })
      }
    },
    next(path, type) {
      if (type == 8) {
        this.$router.push({path: path});
      } else if (type == 1) {
        this.$router.push({
          path: path,
          query: {
            'phone': this.phone,
            'token': this.token,
            'brandId': this.global.brandId,
            'userId': this.userId,
            'ip': this.global.ip,
            'type': 'h5',
            'deviceId': localStorage.getItem('did')
          }
        });
      }
    },
    // 获取轮播图
    getBanners(type) {
      getBanner(this.global.brandId, type).then(res => {
        if (res.resp_code == '000000') {
          this.bannerListDef = res.result
        }
      })
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.getBanners(0)
        this._getBrandNews()
        this._getMessage()
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    },
    meiqia() {
      this.$router.push({name: 'service', params: {num: this.serviceNum.length}})
    }
  }
};

</script>
<style scoped>
.ke {
  font-size: 13px;
}

.home {
  height: 100vh;
  background: #fff;
}

.home_header {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0 14px;
  box-sizing: border-box;
  height: 46px;
  position: fixed;
  z-index: 999;
  color: #fff;
}

.home_header img {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.home_header_item {
  display: flex;
  align-items: center;
  font-size: 11px;
  padding-top: 5px;
  width: 55px;
}

.home_header_title {
  font-size: 17px;
}

.tabbar_p {
  height: 50px;
  width: 100%;
}

.nav_box {
  height: 140px;
  width: 100%;
  padding: 20px 0;
  color: #fff;
  font-size: 13px;
}

.nav_list {
  display: flex;
}

.nav_item {
  flex: 1;
  text-align: center;
}

.nav_item img {
  height: 40px;
  width: 40px;
}

.menu_box {
  padding: 33px 0;
  width: 100%;
  border-radius: 30px 30px 0px 0px;
  margin-top: -30px;
  position: relative;
  z-index: 111;
  background: #fff;
}

.menu_list {
  display: flex;
  font-size: 12px;
  color: #333;
}

.menu_item {
  flex: 1;
  text-align: center;

}

.menu_item img {
  height: 34px;
  width: 34px;
}

.cont {
  padding: 0 10px;
  background: #fff;
}

.news {
  width: 100%;
  padding: 10px;
  background: #F5F5F5;
  border-radius: 10px;
  display: flex;
  font-size: 12px;
}

.news .left img {
  height: 55px;
  max-width: 100%;
}

.news .left {
  width: 68px;
}

.news .right {
  flex: 1;
}

.news .icon {
  width: 20px;
  position: relative;
}

.news .icon .icon_icon {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 16px;
  color: #666;
}

.home_notivce {
  height: 55px;
}

.new_swipe span {
  color: #999;
  font-size: 12px;
  line-height: 12px;
}

.new_swipe div {
  color: #666;
  font-size: 13px;
  line-height: 13px;
}

.new_swipe p {
  font-size: 14px;
  color: #333;
  line-height: 20px;
}

.notice-swipe {
  height: 55px;


}

.activity_title {
  padding: 15px 10px;
}

.activity_title > span {
  font-size: 14px;
  font-weight: 500;
  color: #333;
  display: inline-block;
  border-left: 2.5px solid #F08300;
  padding: 0 10px;
}

.activity_bg img {

  max-width: 100%;

}

</style>
