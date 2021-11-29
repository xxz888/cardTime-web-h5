<template>
  <div>
    <van-nav-bar title="在线申请信用卡" left-arrow @click-left="onClickLeft"></van-nav-bar>
    <div class="warpper">
      <ul class="my_cell_list">
        <li v-for="item in dataList" class="my_cell_item van-hairline--bottom" :key="item.title"
            @click="jump(item.link)">
          <div class="left">
            <img src="https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/my/card_icon.png" alt="">
            <span>{{ item.title }}</span>
          </div>
          <div class="icon">
            <van-icon class="icon_icon" size="16" name="arrow"/>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {NavBar, Icon} from 'vant'
import {applyList} from "@/api/creditManage/apply";

export default {
  name: "cardApply.vue",
  data() {
    return {
      dataList: []
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon
  },
  created() {
    this.getApplyList()
  },
  methods: {
    onClickLeft() {
      history.go(-1)
    },
    jump(link) {
      window.open(link, '_self')
    },
    getApplyList() {
      applyList().then(res => {
        if (res.resp_code == '000000') {
          this.dataList = res.result
        } else {
          this.$Toast(res.resp_message, 'bottom')
        }
      })
    }
  }
}
</script>

<style scoped>
.my_cell_list {
  background: #fff;
  border-radius: 12px;
  /* padding: 10px; */
  margin-bottom: 10px;
}

.my_cell_item {
  height: 64px;
  display: flex;
  font-size: 18px;
  color: #5D5D5D;
  line-height: 64px;
  padding: 0 15px;
}

.my_cell_item .left {
  flex: 1;
}

.my_cell_item .left > img {
  height: 28px;
  width: 28px;
  vertical-align: middle;
  margin-right: 7px;
}
</style>
