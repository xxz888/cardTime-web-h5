<!-- tabbar 导航栏 -->
<template>
  <div >
    <van-tabbar v-model="active" :safe-area-inset-bottom="true"  :route="true" inactive-color="#C2C6C6">
      <div class="flex" :style="'width:100%' ">
        <van-tabbar-item  name="home" :to="'/home'" replace>
          <span>首页</span>
          <img slot="icon" slot-scope="props" :src="props.active ? iconHome.active : iconHome.normal">
        </van-tabbar-item>
        <van-tabbar-item name="news" :to="'/profitHome'" replace>
          <span>收益中心</span>
          <img slot="icon" slot-scope="props" :src="props.active ? iconNews.active : iconNews.normal">
        </van-tabbar-item>
        <!-- <van-tabbar-item name="news" :to="'/news'" replace>
          <span>资讯</span>
          <img slot="icon" slot-scope="props" :src="props.active ? iconNews.active : iconNews.normal">
        </van-tabbar-item>
        <van-tabbar-item name="share" :to="'/share'"
          replace>
          <span>推广</span>
          <img slot="icon" slot-scope="props" :src="props.active ? iconShare.active : iconShare.normal">
        </van-tabbar-item> -->
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
          normal: require('../assets/newicon/组 7960@2x.png'), 
          active: require('../assets/newicon/组 7965@2x.png')
        },
        iconNews: {
            normal: require('../assets/newicon/组 7961@2x.png'), 
          active: require('../assets/newicon/组 7964@2x.png')
        },
        iconMy: {
         normal: require('../assets/newicon/组 7962@2x.png'), 
          active: require('../assets/newicon/组 7963@2x.png')
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
    color: #333333;
  }
  .flex {
        display: flex;
        justify-content: space-evenly;
    }
</style>
