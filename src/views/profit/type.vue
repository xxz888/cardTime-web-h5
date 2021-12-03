<template>
  <div style="background: #fff;">
    <van-nav-bar class="agent_nav theme_bg" style="background: none;" :border='false' :title="title+'分润'" left-arrow
                 @click-left="onClickLeft">
    </van-nav-bar>
    <div class="warpper_top"></div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" loading-text="加载中...">
      <div>
        <div class="profit_type_top theme_bg">
          <ul>
            <li class="item">
              <div class="left">
                <div class="title">{{ title }}总分润（元）</div>
                <div class="amount">{{ profit.totalRebate |toFixed }}</div>
              </div>
              <div class="right"></div>
            </li>
            <li class="item">
              <div class="left">
                <div class="title">当日收益（元）</div>
                <div class="profit_amount">{{ profit.todayRebate |toFixed }}</div>
              </div>
              <div class="right">
                <div class="title">当月收益（元）</div>
                <div class="profit_amount">{{ profit.monthRebate |toFixed }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="profit_share_cont">
          <div class="profit_type_top">
            <div class="profit_type_top_bg">
              <van-dropdown-menu class="date_sel menu" active-color="#C49A4D" background="none">
                <van-dropdown-item v-model="yaer" :options="yearList" @change="dateChange"/>
                <van-dropdown-item v-model="month" :options="monthList" @change="dateChange"/>
              </van-dropdown-menu>
            </div>
          </div>
          <ul class="profit_type_date">
            <li class="item van-hairline--bottom">
              <div>类型</div>
              <div class="type">{{ title }}</div>
              <div class="type">分润</div>
              <p class="right"></p>
            </li>
            <li class="item van-hairline--bottom" @click="next('profitTypeDetail',queryType,1,'直推')">
              <div class="type">直推</div>
              <div>{{ profit.direc1.amount |toFixed }}</div>
              <div class="active">{{ profit.direc1.rebate |toFixed }}</div>
              <p class="right">
                <van-icon name="arrow"/>
              </p>
            </li>
            <li class="item van-hairline--bottom" @click="next('profitTypeDetail',queryType,2,'间推')">
              <div class="type">间推</div>
              <div>{{ profit.direc2.amount |toFixed }}</div>
              <div class="active">{{ profit.direc2.rebate |toFixed }}</div>
              <p class="right">
                <van-icon name="arrow"/>
              </p>
            </li>
            <li class="item" @click="next('profitTypeDetail',queryType,3,'二间推')">
              <div class="type">二间推</div>
              <div>{{ profit.direc3.amount |toFixed }}</div>
              <div class="active">{{ profit.direc3.rebate |toFixed }}</div>
              <p class="right">
                <van-icon name="arrow"/>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  NavBar,
  PullRefresh,
  Icon,
  DropdownMenu,
  DropdownItem
} from 'vant';
import {
  profitSumQuery
} from "@/api/profit";

export default {
  data() {
    return {
      brandId: localStorage.getItem('brandId'),
      userId: localStorage.getItem('userId'),
      phone: localStorage.getItem('phone'),
      isLoading: false,
      fuwuList: [],
      queryType: 1, //1:快捷,2:余额还款,3:空卡还款,6:花呗
      title: "刷卡",
      yearList: [],
      yaer: '',
      month: "",
      monthList: [{
        text: "01月",
        value: '01'
      }, {
        text: "02月",
        value: '02'
      }, {
        text: "03月",
        value: '03'
      },
        {
          text: "04月",
          value: '04'
        }, {
          text: "05月",
          value: '05'
        }, {
          text: "06月",
          value: '06'
        },
        {
          text: "07月",
          value: '07'
        }, {
          text: "08月",
          value: '08'
        }, {
          text: "09月",
          value: '09'
        },
        {
          text: "10月",
          value: 10
        }, {
          text: "11月",
          value: 11
        }, {
          text: "12月",
          value: 12
        }
      ],
      profit: {
        direc1: {
          amount: 0,
          rebate: 0
        },
        direc2: {
          amount: 0,
          rebate: 0
        },
        direc3: {
          amount: 0,
          rebate: 0
        },
        monthRebate: 0,
        todayRebate: 0,
        totalRebate: 0,
      }
    };
  },
  components: {
    [NavBar.name]: NavBar,
    [PullRefresh.name]: PullRefresh,
    [Icon.name]: Icon,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
  },
  computed: {},
  created() {
    this.title = JSON.parse(this.$route.params.title)
    this.queryType = JSON.parse(this.$route.params.level)
    this.getData()
    this._profitSumQuery()
  },
  methods: {
    onClickLeft() {
      this.publicJs.back();
    },
    getData() {
      var d = new Date(),
        nowYear = d.getFullYear(),
        month = d.getMonth() + 1;
      this.yaer = nowYear
      if (month < 9) {
        month = '0' + (month)
      }
      this.month = month
      this.yearList = [{
        text: nowYear + '年',
        value: nowYear
      },
        {
          text: nowYear - 1 + '年',
          value: nowYear - 1
        },
        {
          text: nowYear - 2 + '年',
          value: nowYear - 2
        }
      ]
    },
    dateChange() {
      this._profitSumQuery()
    },
    _profitSumQuery() {
      profitSumQuery(this.queryType, String(this.yaer) + String(this.month)).then(res => {
        if (res.resp_code == '000000') {
          this.profit = res.result
        }
      })
    },
    next(name, level, type, title) {
      this.$router.push({
        name: name,
        params: {
          type: JSON.stringify(type),
          level: JSON.stringify(level),
          title: JSON.stringify(title),
          yaer: JSON.stringify(this.yaer),
          month: JSON.stringify(this.month)
        }
      });
    },
    // 下拉刷新
    onRefresh() {
      setTimeout(() => {
        this.$toast('刷新成功');
        this.isLoading = false;
      }, 1000);
    }
  }
};

</script>
<style scoped>
>>> .van-popup {
  width: 94.7%;
  left: 10px;
  border-radius: 0px 0px 5px 5px;
}

.agent_nav >>> .van-nav-bar__title.van-ellipsis {
  color: #fff;
}

.agent_nav >>> .van-icon {
  color: #FFFFFF !important;
}

.profit_type_top_bg {
  background: #fff;
  padding: 3px;
  border-radius: 10px;
  box-shadow: 0px 1px 10px 0px rgba(0, 0, 0, 0.09);
}

.profit_type_top_bg >>> .van-dropdown-menu__bar {
  box-shadow: none;
}

.profit_type_top {
  width: 100%;
  padding: 10px 0 25px 0;
  font-size: 15px;
  color: #fff;
  border-radius: 0 0 20px 20px;
}

.profit_type_top .item {
  display: flex;
  padding-bottom: 20px;
}

.profit_type_top .item > div {
  flex: 1;
  text-align: center;
}

.profit_type_top .item .title {
  font-size: 13px;
  line-height: 30px;
  font-weight: 300;

}

.profit_type_top .item .amount {
  font-size: 32px;
}

.profit_type_top .item .profit_amount {
  font-size: 20px;
}

.profit_type_top .item .right {
  position: relative;
}

.profit_share_cont {
  padding: 0 10px;
  margin-top: -30px;
}

.profit_type_date {
  font-size: 14px;
  color: #333;
}

.profit_type_date .item {
  display: flex;
  line-height: 44px;
  text-align: center;
}

.profit_type_date .item .right {
  width: 40px;
  color: #666;
  font-size: 15px;
  line-height: 44px;
}

.profit_type_date .item div {
  flex: 1;
}

.active {
  color: #F63802;
}

.profit_type_date .type {
  font-size: 12px;
  color: #666;
}
</style>
