<template>
  <div class="home">
    <!-- 头部导航 -->
    <div class="home_header theme_bg">
      <div class="home_header_item"></div>
      <div class="home_header_title">首页</div>
      <div class="home_header_item" @click="meiqia">
        <van-icon
          name="service-o"
          size="18px"
          :badge="dot ? $store.state.user.unread : ''"
        />
        <!-- <span class="ke"> 客服 </span> -->
      </div>
    </div>
    <div class="warpper_top"></div>
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      loading-text="加载中..."
    >
      <div>
        <div class="nav_box theme_bg">
          <ul class="nav_list">
            <li class="nav_item">
              <img
                src="@/assets/newicon/组 8012@2x.png"
                @click="next('/online', 8)"
                alt=""
              />
              <div class="">在线收款</div>
            </li>
            <li class="nav_item" @click="next('/zero', '1')">
              <img src="@/assets/newicon/组 8040@2x.png" alt="" />
              <div class="">空卡还款</div>
            </li>
            <li class="nav_item" @click="next('/creditcard', '1')">
              <img src="@/assets/newicon/组 8041@2x.png" alt="" />
              <div class="">智能还款</div>
            </li>
          </ul>
        </div>
        <div class="menu_box">
          <ul class="menu_list">
            <li class="menu_item menu_item1" @click="next('/agent', 8)">
              <img
                class="menu_item1"
                src="@/assets/newicon/组 7943@2x.png"
                alt=""
              />
              <div class="">顶级代理</div>
            </li>
            <li class="menu_item" @click="next('/credit', 8)">
              <img src="@/assets/newicon/组 7942@2x.png" alt="" />
              <div class="">信用管理</div>
            </li>
            <!-- @click="next('/profitHome',8)" -->
            <li class="menu_item" @click="cardApply">
              <img src="@/assets/newicon/组 7941@2x.png" alt="" />
              <div class="">在线办卡</div>
            </li>
            <li class="menu_item" @click="huabeiAction">
              <img src="@/assets/newicon/组 7944@2x.png" alt="" />
              <div class="">花呗收款</div>
            </li>
          </ul>
        </div>
        <div class="cont">
          <div class="news">
            <div class="left">
              <img src="@/assets/newicon/组 7937@2x.png" alt="" />
            </div>
            <div class="right" @click="next('/message', 8)">
              <van-notice-bar
                :scrollable="false"
                background="none"
                class="home_notivce"
              >
                <van-swipe
                  vertical
                  class="notice-swipe"
                  :autoplay="3000"
                  :show-indicators="false"
                >
                  <van-swipe-item
                    v-for="(item, index) in newsList"
                    :key="index"
                  >
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
              <van-icon class="icon_icon" size="16" name="arrow" />
            </div>
          </div>
          <div class="activity_box">
            <div class="activity_title">
              <!-- <span>最新活动</span> -->
            </div>
            <div>
              <van-swipe
                class="activity_bg"
                :autoplay="3000"
                indicator-color="white"
              >
                <van-swipe-item @click="shougonggao = true">
                  <img src="@/assets/newicon/蒙版组 112@2x.png" style="object-fit:fill;width:100%" alt="" />
                </van-swipe-item>
              </van-swipe>
            </div>
            <div class="skip">
              <div @click="$router.push('/sharePage')" class="skip_share">
                <h5>分享推广</h5>
                <p>推广越多/赚的越多</p>
              </div>
              <div @click="$router.push('/library')" class="skip_item">
                <h5>一键朋友圈</h5>
                <p>一键推广/省时省力</p>
              </div>
              <div
                @click="$router.push('/partnerBusiness')"
                class="skip_material"
              >
                <h5>推广物料</h5>
                <p>应有尽有/丰富多彩</p>
              </div>
              <div @click="hdt" class="skip_news">
                <h5>业内动态</h5>
                <p>了解动态/运筹帷幄</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </van-pull-refresh>
    <div class="tabbar_p"></div>
    <tabbar></tabbar>
    <guide step="1" @next="next('/online', 8)" />


<van-dialog v-model="shougonggao" title="关于卡德世界收购公告">
  <img src="../../assets/gonggao1.png" style="width:100%;height:100%"/>
</van-dialog>
  </div>
</template>

<script>
import { PullRefresh, NoticeBar, Swipe, SwipeItem, Icon,Dialog } from "vant";
import tabbar from "@/components/tabbar";
import { userInfoQuery } from "@/api/user";
import {
  getBanner,
  newsQuery,
  getBrandNews,
  getMessage,
} from "@/api/showBrand";
import guide from "@/components/guide/guide";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      dot: false,
      shougonggao:false,
      token: localStorage.getItem("token"),
      phone: localStorage.getItem("phone"),
      userId: localStorage.getItem("userId"),
      isLoading: false,
      bannerListDef: [],
      fuwuList: [],
      newsList: [],
      serviceNum: [],
    };
  },
  components: {
    [PullRefresh.name]: PullRefresh,
    [NoticeBar.name]: NoticeBar,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Icon.name]: Icon,
    tabbar,
    guide,
    [Dialog.Component.name]: Dialog.Component,
  },
  created() {

    this.getBanners(0);
    this._getBrandNews();
    this._newsQuery();
    this._getMessage();
    this.isSealname();
  },
  activated() {

    this._getMessage();
  },
  beforeRouteEnter(to, from, next) {
    //如果上个页面是绑卡页面或者登录页面执行下面方法
    if (from.name == "depositCardAdd" || from.name == "login") {
      next((vm) => {
        vm.isSealname();
      });
    }
    next();
  },
  watch: {
    "$store.state.user.unread": (value) => {
      //监听存储的客服消息客服按钮判断显示状态
      if (value > 0) {
        this.dot = true;
      } else {
        this.dot = false;
      }
    },
  },
  methods: {
    hdt(){
    this.$toast('暂未开放')
    },
    //花呗
    huabeiAction() {
      this.$toast({ message: "敬请期待", position: "bottom" });
    },
    isSealname() {
      // 判断存储在本地的实名状态如果已实名开始判断认证状态
      if (
        localStorage.getItem("realnameStatus") != 1 &&
        localStorage.getItem("realnameStatus") != null
      ) {
                this.$router.push({name: "faceRecognitionDetail"});

        // this.$toast({ message: "请去APP实名后登录", position: "bottom" });
        // let did = localStorage.getItem("did");
        // localStorage.clear();
        // sessionStorage.clear();
        // Cookies.remove('token');

        // if (did) {
        //   localStorage.setItem("did", did);
        // }
        
        // this.$router.push({ name: "login" });
      } else {
        this._getUserMessage();
      }
    },
    //-----------获得用户信息-----------
    _getUserMessage() {
      userInfoQuery(localStorage.getItem("token")).then((res) => {
        if (res.resp_code == "000000") {
          if (res.result.verificationStatus == 0) {
            this.$dialog
              .confirm({
                title: "温馨提示",
                message:
                  "恭喜您注册实名成功，请认证信用卡，首刷认证后可获得10元奖励",
                confirmButtonText: "开始认证",
                cancelButtonText: "下次认证",
              })
              .then(() => {
                this.$store.commit("guide");
              });
          } else {
            this.$store.commit("closeGuide");
          }
        }
      });
    },
    _newsQuery(type) {
      newsQuery(this.global.brandId, "功能跳转").then((res) => {
        if (res.resp_code == "000000") {
          this.fuwuList = res.result.content;
        }
      });
    },
    //--------查询用户留言-----------
    _getMessage() {
      getMessage(this.userId).then((res) => {
        let serviceNum = [];
        if (res.resp_code == "000000") {
          res.result.forEach((item) => {
            if (item.type == 0) {
              serviceNum.push(item);
            }
          });
          this.serviceNum = [...new Set(serviceNum)];
          if (this.$store.state.user.unread < this.serviceNum.length) {
            let num = (this.$store.state.user.unread += this.serviceNum.length);
            this.$store.commit("Unread", num);
          } else {
            return;
          }
        }
      });
    },
    _getBrandNews() {
      getBrandNews(this.token, 20).then((res) => {
        if (res.resp_code == "000000") {
          this.newsList = res.result.content;
        

          if (res.result.content.length != 0) {



            var endTime = this.dateToTimestamp(res.result.content[0].endTime);
            var currentTime = Date.parse(new Date());

            var isshow;var valueId;
            if (localStorage.getItem("kd_l_isshow")) {
              isshow  = localStorage.getItem("kd_l_isshow").split('||')[0];
              valueId = localStorage.getItem("kd_l_isshow").split('||')[1];
            }
            if (isshow == 1 && valueId == res.result.content[0].id) {
            
            } else{
                  this.$dialog
                  .alert({
                    title: res.result.content[0].title,
                    message: res.result.content[0].content,
                    theme: "round-button",
                  })
                  .then(() => {
                    var value = '1||'+res.result.content[0].id;
                     localStorage.setItem("kd_l_isshow", value);
                  });
            }
          }
        }
      });
    },
    dateToTimestamp(dateStr) {
      if (!dateStr) {
        return "";
      }
      let newDataStr = dateStr.replace(/\.|\-/g, "/");
      let date = new Date(newDataStr);
      let timestamp = date.getTime();
      return timestamp;
    },
    cardApply() {
      this.$router.push("/card/apply");
    },
    link1(){
          



          this.$router.push({
            name: "appLink",
            params: {
              url: JSON.stringify('https://mp.weixin.qq.com/s/zxjORAQFlk0X4R9Y0n_-qw'),
              title: JSON.stringify("关于卡德世界收购公告"),
              type: "0",

            },
          });




    },
    link(item) {
      debugger
      let num = 0;
      var ua = window.navigator.userAgent.toLowerCase();
      this.fuwuList.map((key) => {
        if (item == "信用卡办卡") {
          this.$toast({
            message: "网申渠道更新",
            position: "bottom",
          });
          return;
        }
        if (key.title == item) {
          var url =
            key.content +
            "?phone=" +
            this.phone +
            "&token=" +
            this.token +
            "&brandId=" +
            this.global.brandId +
            "&userId=" +
            this.userId +
            "&ip=" +
            this.global.ip +
            "&deviceId=" +
            localStorage.getItem("kd_webapp_deviceId");
          this.$router.push({
            name: "appLink",
            params: {
              url: JSON.stringify(url),
              title: JSON.stringify(key.title),
              type: "2",
            },
          });
          return;
        } else {
          num++;
        }
      });
      if (num == this.fuwuList.length) {
        this.$toast({
          message: "敬请期待",
          position: "bottom",
        });
      }
    },
    next(path, type) {
      if (type == 8) {
        this.$router.push({ path: path });
      } else if (type == 1) {
        this.$router.push({
          path: path,
          query: {
            phone: this.phone,
            token: this.token,
            brandId: this.global.brandId,
            userId: this.userId,
            ip: this.global.ip,
            type: "h5",
            deviceId: localStorage.getItem("did"),
          },
        });
      }
    },
    // 获取轮播图
    getBanners(type) {
      getBanner(this.global.brandId, type).then((res) => {
        if (res.resp_code == "000000") {
          this.bannerListDef = res.result;
        }
      });
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.getBanners(0);
        this._getBrandNews();
        this._getMessage();
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
    meiqia() {
      this.$router.push({
        name: "service",
        params: { num: this.serviceNum.length },
      });
    },
  },
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
  height: 70px;
  width: 100%;
}

.nav_box {
  height: 150px;
  width: 100%;
  padding: 40px 10px;
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
  height: 30px;
  width: 30px;
}

.menu_box {
  padding: 33px 0;
  width: 100%;
  border-radius: 10px 10px 0px 0px;
  margin-top: -20px;
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
.menu_item1 {
  height: 44px;
  width: 44px;
}
.cont {
  padding: 0 10px;
  background: #fff;
}

.news {
  width: 100%;
  padding: 10px;
  background: #fff;
  border-radius: 10px;
  display: flex;
  font-size: 12px;
}

.news .left img {
  height: 16px;
  max-width: 100%;
}

.news .left {
  /* width: 68px; */
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
  height: 20px;
  color: #666;
}

.home_notivce {
  height: 20px;
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
  border-left: 2.5px solid #c49a4d;
  padding: 0 10px;
}

.activity_bg img {
  max-width: 100%;
  height: 124px;
}

.skip {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.skip div {
  width: 49%;
  height: 70px;
  margin: 5px 0px;
  font-size: 12px;
  color: #fff;
  padding-left: 15px;
  padding-top: 15px;
}

.skip h5 {
  font-size: 15px;
  margin-bottom: 2px;
}

.skip_share {
  background: url("../../assets/newicon/组 7956@2x.png") no-repeat;
  background-size: 100%;
}

.skip_item {
  background: url("../../assets/newicon/组 7959@2x.png") no-repeat;
  background-size: 100%;
}

.skip_material {
  background: url("../../assets/newicon/组 7957@2x.png") no-repeat;
  background-size: 100%;
}

.skip_news {
  background: url("../../assets/newicon/组 7958@2x.png") no-repeat;
  background-size: 100%;
}
</style>
