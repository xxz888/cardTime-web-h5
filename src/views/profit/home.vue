<template>
  <div>
    <van-nav-bar
      class="agent_nav theme_bg"
      style="background: none"
      :border="false"
      title="收益中心"
      @click-left="onClickLeft"
    />
    <div class="warpper_top"></div>
    <div>
      <div class="profit_home_top theme_bg">
        <div class="item" style="padding-bottom: 0">
          <div class="schedule">
            <p class="allRebate">可提现（元）</p>
            <h3 class="allRebateH3">
              {{ userAccount.currentBalance | toFixed }}
            </h3>
          </div>
        </div>
        <div class="item item_view" style="margin-left:10%;margin-right:10%">
          <div class="right_border">
            <p class="userid">当日收益（元）</p>
            <p class="useridPrice">{{ userAccount.todayTotal | toFixed }}</p>
          </div>
          <div class="right_border">
            <p class="userid">当月收益（元）</p>
            <p class="useridPrice">{{ userAccount.curMonthTotal | toFixed }}</p>
          </div>
        </div>
        <div class="item" style="margin-left:10%;margin-right:10%">
          <div class="withdrawal" @click="next('/withdraw',8)">立即提现</div>
          <div class="mibu" @click="next('creditLose',11)">弥补</div>
        </div>
      </div>
      <div class="profit_home_cont_box">
        <div class="profit_home_cont">
          <ul>
            <li class="item" @click="next('/profitShare',8)">
              <img src="@/assets/newicon/收益@2x.png" alt="" />
              <p>推广收益</p>
            </li>
            <li class="item" @click="next('profitType',1,'刷卡')">
              <img src="@/assets/newicon/刷卡@2x.png" alt="" />
              <p>刷卡分润</p>
            </li>
            <li class="item" @click="next('profitType',2,'还款')">
              <img src="@/assets/newicon/组 7977@2x.png" alt="" />
              <p>还款分润</p>
            </li>
            <li class="item" @click="next('profitRecord',4,'达标奖励')">
              <img src="@/assets/newicon/组 7976@2x.png" alt="" />
              <p>达标奖励</p>
            </li>
            <li class="item" @click="next('/profitCashback',8)">
              <img src="@/assets/newicon/组 7975@2x.png" alt="" />
              <p>红利返现</p>
            </li>
            <li class="item" @click="next('profitType',3,'空卡')">
              <img src="@/assets/newicon/产品分红@2x.png" alt="" />
              <p>空卡分润</p>
            </li>

            <li class="item" @click="next('profitUser', 1)">
              <img src="@/assets/newicon/组 7978@2x.png" alt="" />
              <p>直推用户</p>
            </li>
            <li
              class="item"
              @click="next('profitRecord',8,'提现记录')"
            >
              <img src="@/assets/newicon/提现@2x.png" alt="" />
              <p>提现记录</p>
            </li>
            <li class="item" @click="next('profitRecord',7,'弥补记录')">
              <img src="@/assets/newicon/住房补贴明细@2x.png" alt="" />
              <p>弥补记录</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
import { NavBar, PullRefresh, Icon } from "vant";
import { newsQuery, getMessage } from "@/api/showBrand";
import { userQuotaQuery } from "@/api/creditManage";
import { getAccountQuery, getSumrebater } from "@/api/user";
import tabbar from "@/components/tabbar";

export default {
  data() {
    return {
      brandId: localStorage.getItem("brandId"),
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      phone: localStorage.getItem("phone"),
      isLoading: false,
      fuwuList: [],
      balance: 0,
      monthRebate: 0,
      todayRebate: 0,

      userAvatar: "",
      allRebate: 0,
      user: {},
      userAccount: {},
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon,
    tabbar,
  },
  created() {
    this._newsQuery();
    this._getAccountQuery();
    this._getSumrebater();
    this._getMessage();
  },
  activated() {
    this._getMessage();
    this._newsQuery();
    this._getAccountQuery();
    this._getSumrebater();
  },
  methods: {
    onClickLeft() {
      this.publicJs.back();
    },
    //弥补
    mibu(){

    },
    //--------查询用户留言-----------
    _getMessage() {
      getMessage(this.userId).then((res) => {});
    },
    _newsQuery() {
      newsQuery(this.global.brandId, "功能跳转").then((res) => {
        if (res.resp_code == "000000") {
          this.fuwuList = res.result.content;
        }
      });
    },
    _getAccountQuery() {
      getAccountQuery(this.token).then((res) => {
        if (res.resp_code == "000000") {
          this.balance = res.result.balance;
        }
      });
    },
    _getSumrebater() {
      getSumrebater(this.userId).then((res) => {
        if (res.resp_code == "000000") {
          this.monthRebate = res.result.monthRebate;
          this.todayRebate = res.result.todayRebate;
        }
      });
    },
    next(path, type, title) {
      if (title == 0) {
        //如果点击提现按钮判断实名状态。未实名直接退出登录
        if (
          localStorage.getItem("realnameStatus") != 1 &&
          localStorage.getItem("realnameStatus") != null
        ) {
          this.$toast({ message: "请去APP实名后登录", position: "bottom" });
          let did = localStorage.getItem("did");
          localStorage.clear();
          sessionStorage.clear();
          if (did) {
            localStorage.setItem("did", did);
          }
          this.$router.push({ name: "login" });
        } else {
          if (type == 8 && path != "profitRecord") {
            this.$router.push({ path: path });
          } else if (type == 11) {
            this.$router.push({
              name: path,
              params: { type: JSON.stringify(type) },
            });
          } else {
            this.$router.push({
              name: path,
              params: {
                level: JSON.stringify(type),
                title: JSON.stringify(title),
              },
            });
          }
        }
      } else {
        if (type == 8 && path != "profitRecord") {
          this.$router.push({ path: path });
        } else if (type == 11) {
          this.$router.push({
            name: path,
            params: { type: JSON.stringify(type) },
          });
        } else {
          this.$router.push({
            name: path,
            params: {
              level: JSON.stringify(type),
              title: JSON.stringify(title),
            },
          });
        }
      }
    },
    link(item) {
      let num = 0;
      this.fuwuList.map((key) => {
        if (key.title == item) {
          var url = key.content;
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
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast("刷新成功");
        this.isLoading = false;
      }, 1000);
    },
  },
};
</script>
<style scoped>
.agent_nav >>> .van-nav-bar__title.van-ellipsis {
  color: #fff;
}

.agent_nav >>> .van-icon {
  color: #ffffff !important;
}

.profit_home_top {
  width: 100%;
  padding: 10px 17px;
  font-size: 15px;
  color: #fff;
  display: flex;
  flex-direction: column;
  padding-bottom: 50px;

  background: url("../../assets/newicon/Rectangle@2x.png") no-repeat;
  background-size: 100%;
}

.home_box {
}

.profit_home_top .item {
  display: flex;
  padding-bottom: 15px;
}

.item > .userAvatar {
  flex: 1;
}

.item > .userdata {
  padding-top: 5px;
  flex: 4;
  font-size: 14px;
}

.userid {
  margin-top: 5px;

  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 15px;
  color: #f8fafb;
  opacity: 0.6;
}

.profit_home_top .item .title {
  font-size: 13px;
  line-height: 30px;
  font-weight: 300;
}

.profit_home_top .item .amount {
  font-size: 32px;
}

.profit_home_top .item .profit_amount {
  font-size: 20px;
}

.profit_home_top .item .right {
  position: relative;
}

.profit_home_top .item .right .btn {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.profit_home_top .item .right .btn span {
  display: inline-block;
  border-radius: 13px;
  font-size: 15px;
}

.withdrawal {
  /* background: #65D385;
  margin-right: 10px;
  margin: 0px auto;
  width: 200px;
  height: 35px;
  border-radius: 5px;
  line-height: 35px;
  text-align: center; */
  width: 120px;
  height: 35px;
  background: #ffffff;
  opacity: 1;
  border-radius: 20px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 35px;
  color: #c49a4d;
  opacity: 1;
  text-align: center;
  margin-right: 10px;
  margin: 0px auto;
}
.mibu {
  border: 1px solid #ffffff;
  opacity: 1;

  width: 120px;
  height: 35px;
  opacity: 1;
  border-radius: 20px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 35px;
  color: #fff;
  opacity: 1;
  text-align: center;
  margin-right: 10px;
  margin: 0px auto;
}
.profit_home_top .item .right .btn .makeup {
  border: 1px solid #ffffff;
  padding: 2px 9px;
}

.profit_home_cont {
  width: 330px;
  margin: -70px auto 0px auto;
  border-radius: 5px;
  background: #fff;
}

.profit_home_cont_box {
  background: #fff;
  padding: 20px 15px;
}

.profit_home_cont .title {
  font-size: 14px;
  color: #333;
}

.profit_home_cont .title > img {
  height: 11px;
  width: 18px;
  vertical-align: middle;
}

.profit_home_cont .title span {
  vertical-align: middle;
  padding-left: 5px;
}

.profit_home_cont > ul {
  padding: 20px 0;
  display: flex;
  flex-wrap: wrap;
}

.profit_home_cont .item {
  width: 33%;
  text-align: center;
  margin: 15px 0px;
  position: relative;
}

.profit_home_cont .item > img {
  width: 30px;
}

.profit_home_cont .item > p {
  font-size: 12px;
  color: #333;
  width: 100%;
  text-align: center;
  position: absolute;
  top: 40px;
  bottom: 0;
}

.item_view div {
  font-size: 16px;
  text-align: center;
  flex: 1;
}

.appLogo {
  height: 55px;
  width: 55px;
  border-radius: 50%;
}

.schedule {
  /* background: url('../../assets/newicon/组 8012@2x.png') no-repeat;
  background-size: 100%; */
  width: 200px;
  height: 110px;
  margin: 0px auto;
  text-align: center;
  padding-top: 10px;
}

.allRebate {
  margin-top: 5px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 15px;
  color: #f8fafb;
  opacity: 0.6;
}
.allRebateH3 {
  margin-top: 25px;
  font-size: 50px;
  font-family: DIN;
  font-weight: bold;
  line-height: 21px;
  color: #f8fafb;
  opacity: 1;
}
.right_border {
  /* width: 40%; */
}
.useridPrice {
  margin-top: 15px;
  font-size: 26px;
  font-family: DIN;
  font-weight: 500;
  line-height: 21px;
  color: #f8fafb;
  opacity: 1;
}
</style>
