<!-- tabbar 导航栏 -->
<template>
  <div >
    <van-tabbar v-model="active" :safe-area-inset-bottom="true"  :route="true">
      <div class="flex" :style="'width:100%' ">
        <van-tabbar-item  name="home" :to="'/home'" replace>
          <span>首页</span>
          <img slot="icon" slot-scope="props" :src="props.active ? iconHome.active : iconHome.normal">
        </van-tabbar-item>
        <van-tabbar-item name="news" :to="'/news'" replace>
          <span>资讯</span>
          <img slot="icon" slot-scope="props" :src="props.active ? iconNews.active : iconNews.normal">
        </van-tabbar-item>
        <van-tabbar-item name="share" :to="'/share'"
          replace>
          <span>推广</span>
          <img slot="icon" slot-scope="props" :src="props.active ? iconShare.active : iconShare.normal">
        </van-tabbar-item>
        <van-tabbar-item  name="my" :to="'/my'" replace>
          <span>我的</span>
          <img slot="icon" slot-scope="props" :src="props.active ? iconMy.active : iconMy.normal">
        </van-tabbar-item>
      </div>
    </van-tabbar>
  </div>
</template>

<script>
  import {
    Tabbar,
    TabbarItem
  } from 'vant'
  export default {
    data() {
      return {
        active: 'home',
        iconHome: {
          normal: 'https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/tabbar/home_normal.png',
          active: 'https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/tabbar/home_active.png'
        },
        iconNews: {
          normal: 'https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/tabbar/news_normal.png',
          active: 'https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/tabbar/news_active.png'
        },
        iconShare: {
          normal: 'https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/tabbar/share_normal.png',
          active: 'https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/tabbar/share_active.png'
        },
        iconMy: {
          normal: 'https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/tabbar/my_normal.png',
          active: 'https://cader-install.oss-cn-shanghai.aliyuncs.com/backManage/tabbar/my_active.png'
        },
      };
    },
    components: {
      [Tabbar.name]: Tabbar,
      [TabbarItem.name]: TabbarItem,
    }
  }

</script>
<style scoped>
  .van-tabbar--fixed{
    position: fixed !important;
  }
  .van-tabbar-item--active {
    color: #F08300;
  }
  .flex {
        display: flex;
        justify-content: space-evenly;
    }
</style>
